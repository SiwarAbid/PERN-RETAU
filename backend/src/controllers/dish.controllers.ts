import { Request, Response } from 'express';
import { prisma } from '../prisma';

// Créer un nouveau plat
export const createDish = async (req: Request, res: Response) => {
  try {
    const { name, description, price, categoryId } = req.body;
    if (!name || !price || !categoryId) {
      return res.status(400).json({ error: 'Nom, prix et catégorie requis' });
    }

    const existingDish = await prisma.dish.findFirst({ where: { name } });
    if (existingDish) return res.status(400).json({ error: 'Nom déjà utilisé' });

    const dish = await prisma.dish.create({
      data: { name, description, price: Number(price), categoryId: Number(categoryId) }
    });
    res.status(201).json(dish);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer tous les plats
export const getDishes = async (_req: Request, res: Response) => {
  try {
    const dishes = await prisma.dish.findMany();
    res.json(dishes);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer un plat par ID
export const getDishById = async (req: Request, res: Response) => {
  try {
    const dish = await prisma.dish.findUnique({ where: { id: Number(req.params.id) } });
    if (!dish) return res.status(404).json({ error: 'Plat non trouvé' });
    res.json(dish);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour un plat
export const updateDish = async (req: Request, res: Response) => {
  try {
    const { name, description, price, categoryId } = req.body;
    const data: any = {};
    if (name) data.name = name;
    if (description) data.description = description;
    if (price) data.price = Number(price);
    if (categoryId) data.categoryId = Number(categoryId);

    const dish = await prisma.dish.update({
      where: { id: Number(req.params.id) },
      data
    });
    res.json(dish);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer un plat
export const deleteDish = async (req: Request, res: Response) => {
  try {
    await prisma.dish.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Plat supprimé' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};