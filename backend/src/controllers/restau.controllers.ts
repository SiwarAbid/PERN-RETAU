import { Request, Response } from 'express';
import { prisma } from '../prisma';

// Créer un nouveau restaurant
export const createRestau = async (req: Request, res: Response) => {
  try {
    const { name, address, description, aboutUs, phone, email, image, logo } = req.body;
    if (!name || !address || !aboutUs || !phone || !email || !image || !logo) {
      return res.status(400).json({ error: 'Tous les champs requis ne sont pas fournis' });
    }

    const existingRestau = await prisma.restau.findFirst({ where: { name } });
    if (existingRestau) return res.status(400).json({ error: 'Nom déjà utilisé' });

    const restau = await prisma.restau.create({
      data: { name, address, description, aboutUs, phone, email, image, logo }
    });
    res.status(201).json(restau);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer tous les restaurants
export const getRestaus = async (_req: Request, res: Response) => {
  try {
    const restaus = await prisma.restau.findMany();
    res.json(restaus);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getLastRestau = async (req: Request, res: Response) => {
  try {
    const restau = await prisma.restau.findFirst({ orderBy: { createdAt: 'desc'} });
    if (!restau) return res.status(404).json({ error: 'Aucun Restaurant trouvé' });
    res.json(restau);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour un restaurant
export const updateRestau = async (req: Request, res: Response) => {
  try {
    const { name, address, description } = req.body;
    const data: any = {};
    if (name) data.name = name;
    if (address) data.address = address;
    if (description) data.description = description;

    const restau = await prisma.restau.update({
      where: { id: Number(req.params.id) },
      data
    });
    res.json(restau);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer un restaurant
export const deleteRestau = async (req: Request, res: Response) => {
  try {
    await prisma.restau.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Restaurant supprimé' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};