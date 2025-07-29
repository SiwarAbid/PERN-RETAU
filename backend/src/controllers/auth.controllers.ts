import { NextFunction, Request, Response } from 'express';
import { prisma } from '../prisma';
import { hashPassword, comparePasswords } from '../utils/hash';
import { generateToken } from '../utils/jwt';
import validator from 'validator';
import PasswordValidator from 'password-validator';
import passport from 'passport';
import e from 'connect-flash';

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
    console.error("Erreur lors de l'enregistrement :", err);
    return res.status(500).json({ message: 'Erreur interne du serveur.' });
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
  let { email, password, provide } = req.body;
  console.log(email, password, provide)
  try {
    if (provide === undefined) provide = 'LOCAL';
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Email non trouvé' });
    console.log(" USER : ", user)
    if (user.provider !== provide) return res.status(401).json({ message : 'Mode de connexion non supporté'})
    const match = await comparePasswords(password, user.password);
    if (!match) return res.status(401).json({ message: 'Mot de passe incorrect' });

    const token = generateToken({ id: user.id, role: user.role });
    res.json({ token, user });
  } catch (err) {
    console.error('Erreur dans /login:', err);
    return res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

export const googleAuthLogin = passport.authenticate('google-login', { scope: ['profile', 'email'] });
export const googleAuthRegister = passport.authenticate('google-register', { scope: ['profile', 'email'] });
// export const facebookAuth = passport.authenticate('facebook', { scope: ['public_profile', 'email'] });
// export const appleAuth = passport.authenticate('Apple', { scope: ['profile', 'email'] });

// Handler générique pour les callbacks d'authentification sociale
const socialAuthCallbackHandler = (strategy: 'google' | 'facebook' | 'apple' | 'local', mode: 'login' | 'register') => 
  (req: Request, res: Response, next: NextFunction) => {
  console.log(`Requête reçue sur /${strategy}/${mode}/callback`, {
    headers: req.headers,
    body: req.body,
  });
  passport.authenticate(`${strategy}-${mode}`, {
    successRedirect: 'http://localhost:5173/accueil',
    failureRedirect: 'http://localhost:5173/',
    failureFlash: true,
    session: false
  }, (err: any, user: { id: number; role: any; } | undefined, info: { message: string } | undefined) => {
    if (err) return next(err);
    if (!user) {
      const message = info?.message || 'Authentication failed.';
      // Correction: 'success' au lieu de 'sucess' et origine explicite pour postMessage
      return res.send(`<script>window.opener.postMessage({ success: false, message: "${message}" }, "http://localhost:5173"); window.close();</script>`);
    }

    // Génération du JWT et envoi au frontend via postMessage
    const token = generateToken({ id: user.id, role: user.role });
    return res.send(`
      <script>
        window.opener.postMessage({ token: '${token}', user: ${JSON.stringify(user)}, success: true }, 'http://localhost:5173/accueil');
        window.close();
      </script>
    `);
  })(req, res, next);
};

export const googleCallbackLogin = socialAuthCallbackHandler('google', 'login');
export const googleCallbackRegister = socialAuthCallbackHandler('google', 'register');
// export const facebookCallbackLogin = socialAuthCallbackHandler('facebook', 'login');
// export const facebookCallbackRegister = socialAuthCallbackHandler('facebook', 'register');
// export const appleCallbackLogin = socialAuthCallbackHandler('apple', 'login');
// export const appleCallbackRegister = socialAuthCallbackHandler('apple', 'register');

