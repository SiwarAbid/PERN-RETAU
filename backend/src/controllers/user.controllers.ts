import { Request, Response } from 'express';
import { prisma } from '../prisma';
import { hashPassword } from '../utils/hash';

// Créer un nouvel utilisateur
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email et mot de passe requis' });

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'Email déjà utilisé' });

    const hashed = await hashPassword(password);

    const user = await prisma.user.create({
      data: { name, email, password: hashed, role }
    });
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