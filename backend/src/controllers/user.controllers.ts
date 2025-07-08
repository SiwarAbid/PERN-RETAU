import { Request, Response } from 'express';
import { prisma } from '../prisma';
import { hashPassword } from '../utils/hash';
import { sendEmail } from './contact.controllers';

// Créer un nouvel utilisateur
export const createUser = async (req: Request, res: Response) => {
  try {
    let { name, email, password, role } = req.body;
    if (!email) return res.status(400).json({ error: 'Email requis' });
    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'Email déjà utilisé' });

    if (!name) name = email.split('@')[0].replace(/\d+/g, '');
    if (!password) password = require('crypto').randomBytes(8).toString('hex');
    else password = await hashPassword(password)

    if (!role) role = 'CLIENT';

    const user = await prisma.user.create({
      data: { name, email, password, role }
    });
    let subject = 'Bienvenue sur SweetCorner!';
    let text = `Bonjour ${name}, 
    Bienvenue sur notre plateforme.
    Nous sommes heureux de vous informer que vous avez été inscrit avec succée dans notre Platforme SWEET CORNER
    Vos informations de connexion sont : 
    
    Email : ${email}
    Mot de passe : ${password}
    
    Merci pour votre confiance.`
    sendEmail({to: email, subject: subject, text: text});
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer tous les utilisateurs
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer un utilisateur par ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(req.params.id) } });
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour un utilisateur
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { password, ...rest } = req.body;
    let data = { ...rest };

    if (password) {
      data.password = await hashPassword(password);
    }

    const user = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data
    });
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer un utilisateur
export const deleteUser = async (req: Request, res: Response) => {
  try {
    await prisma.user.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};