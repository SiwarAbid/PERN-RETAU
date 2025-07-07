import { Request, Response } from 'express';
import { prisma } from '../prisma';

// Créer une nouvelle catégorie
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: 'Le nom est requis' });

    const existingCategory = await prisma.category.findUnique({ where: { name } });
    if (existingCategory) return res.status(400).json({ error: 'Nom déjà utilisé' });

    const category = await prisma.category.create({
      data: { name, description }
    });
    res.status(201).json(category);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer toutes les catégories
export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer une catégorie par ID
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await prisma.category.findUnique({ where: { id: Number(req.params.id) } });
    if (!category) return res.status(404).json({ error: 'Catégorie non trouvée' });
    res.json(category);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour une catégorie
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const data: any = {};
    if (name) data.name = name;
    if (description) data.description = description;

    const category = await prisma.category.update({
      where: { id: Number(req.params.id) },
      data
    });
    res.json(category);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer une catégorie
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    await prisma.category.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Catégorie supprimée' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};