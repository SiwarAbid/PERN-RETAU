import { NextFunction, Request, Response } from 'express';
import { prisma } from '../prisma';
import { hashPassword, comparePasswords } from '../utils/hash';
import { generateToken } from '../utils/jwt';
import validator from 'validator';
import PasswordValidator from 'password-validator';
import passport from 'passport';

export const register = async (req: Request, res: Response): Promise<void | Response> => {
  const { email, password } = req.body;

  try {
    if ( !email || !password) return res.status(400).json({ message: 'Body JSON malformé' });

    if (!validator.isEmail(email)) return res.status(400).json({ message: 'Email non valide' });
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email déjà utilisé' });
    const schema = new PasswordValidator()
      .is().min(8)
      .has().uppercase()
      .has().digits()

    // if (!schema.validate(password)) return res.status(400).json({ message: 'Mot de passe trop faible' });
    const hashed = await hashPassword(password);
    const name = email.split('@')[0].replace(/\d+/g, '');
    const user = await prisma.user.create({
      data: { name, email, password: hashed }
    });

    const token = generateToken({ id: user.id, role: user.role });
    res.json({ token, user });

  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', err });
  }
};

export async function login (req: Request, res: Response) {
  console.log('Requête reçue sur /login', {
    headers: req.headers,
    body: req.body
  });
  // Vérification basique
  if (!req.body || !req.body.email) {
    return res.status(400).json({ error: 'Body JSON malformé' });
  }
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Email non trouvé' });
    console.log(" USER : ", user)
    if (user.provider !== 'LOCAL') return res.status(401).json({ message : 'Mode de connexion non supporté'})
    const match = await comparePasswords(password, user.password);
    if (!match) return res.status(401).json({ message: 'Mot de passe incorrect' });

    const token = generateToken({ id: user.id, role: user.role });
    res.json({ token, user });
  } catch (err) {
    console.error('Erreur dans /login:', err);
    res.status(500).json({ message: 'Erreur serveur', err });
  }
};

export const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });
export const facebookAuth = passport.authenticate('facebook', { scope: ['public_profile', 'email'] });
export const appleAuth = passport.authenticate('Apple', { scope: ['profile', 'email'] });

export async function googleCallback (req: Request, res: Response, next: NextFunction) { 
  console.log('Requête reçue sur /google/callback', {
    headers: req.headers,
    body: req.body
  });
  passport.authenticate('google', {
    successRedirect: 'http://localhost:5173/sucess',
    failureRedirect: 'http://localhost:5173/auth/login',
    failureFlash: true,
    session: false
  }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.send(`<script>window.opener.postMessage({ sucess : false, message : "${info?.message}"},"*");
      window.close();</script>`);

    // ici on peut générer un JWT et rediriger
    const token = generateToken({ id: user.id, role: user.role });
    res.send(`
      <script>
        window.opener.postMessage({ token: '${token}' }, 'http://localhost:5173');
        window.close();
      </script>
    `); // vers frontend
  })(req, res, next);
};



export async function facebookCallback (req: Request, res: Response, next: NextFunction) { 
  console.log('Requête reçue sur /facebook/callback', {
    headers: req.headers,
    body: req.body
  });
  passport.authenticate('facebook' as Parameters<typeof passport.authenticate>[0], {
    successRedirect: 'http://localhost:5173/sucess',
    failureRedirect: 'http://localhost:5173/auth/login',
    failureFlash: true,
    session: false
  }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.send(`<script>window.opener.postMessage({ sucess : false, message : "${info?.message}"},"*");
      window.close();</script>`);

    // ici on peut générer un JWT et rediriger
    const token = generateToken({ id: user.id, role: user.role });
    res.send(`
      <script>
        window.opener.postMessage({ token: '${token}' }, 'http://localhost:5173');
        window.close();
      </script>
    `); // vers frontend
  })(req, res, next);
};


export async function appleCallback (req: Request, res: Response, next: NextFunction) { 
  console.log('Requête reçue sur /apple/callback', {
    headers: req.headers,
    body: req.body
  });
  passport.authenticate('apple' as Parameters<typeof passport.authenticate>[0], {
    successRedirect: 'http://localhost:5173/sucess',
    failureRedirect: 'http://localhost:5173/auth/login',
    failureFlash: true,
    session: false
  }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.send(`<script>window.opener.postMessage({ sucess : false, message : "${info?.message}"},"*");
      window.close();</script>`);

    // ici on peut générer un JWT et rediriger
    const token = generateToken({ id: user.id, role: user.role });
    res.send(`
      <script>
        window.opener.postMessage({ token: '${token}' }, 'http://localhost:5173');
        window.close();
      </script>
    `); // vers frontend
  })(req, res, next);
};


