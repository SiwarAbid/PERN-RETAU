import { Request, Response } from 'express';
import { prisma } from '../prisma';
import { hashPassword, comparePasswords } from '../utils/hash';
import { generateToken } from '../utils/jwt';
import validator from 'validator';
import PasswordValidator from 'password-validator';

export const register = async (req: Request, res: Response): Promise<void | Response> => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) return res.status(400).json({ message: 'Body JSON malformé' });

    if (!validator.isEmail(email)) return res.status(400).json({ message: 'Email non valide' });
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email déjà utilisé' });
    const schema = new PasswordValidator()
      .is().min(8)
      .has().uppercase()
      .has().digits()
      .has().symbols();

    // if (!schema.validate(password)) return res.status(400).json({ message: 'Mot de passe trop faible' });
    const hashed = await hashPassword(password);
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

    const match = await comparePasswords(password, user.password);
    if (!match) return res.status(401).json({ message: 'Mot de passe incorrect' });

    const token = generateToken({ id: user.id, role: user.role });
    res.json({ token, user });
  } catch (err) {
    console.error('Erreur dans /login:', err);
    res.status(500).json({ message: 'Erreur serveur', err });
  }
};
