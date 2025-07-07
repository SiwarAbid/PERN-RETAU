import { Request, Response } from 'express';
import { prisma } from '../prisma';

// Créer un nouvel avis
export const createReview = async (req: Request, res: Response) => {
  try {
    const { rating, comment, userId, dishId } = req.body;
    if (!rating || !userId || !dishId) {
      return res.status(400).json({ error: 'Note, utilisateur et plat requis' });
    }

    const review = await prisma.review.create({
      data: {
        rating: Number(rating),
        comment,
        userId: Number(userId),
        dishId: Number(dishId)
      }
    });
    res.status(201).json(review);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer tous les avis
export const getReviews = async (_req: Request, res: Response) => {
  try {
    const reviews = await prisma.review.findMany();
    res.json(reviews);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer un avis par ID
export const getReviewById = async (req: Request, res: Response) => {
  try {
    const review = await prisma.review.findUnique({ where: { id: Number(req.params.id) } });
    if (!review) return res.status(404).json({ error: 'Avis non trouvé' });
    res.json(review);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour un avis
export const updateReview = async (req: Request, res: Response) => {
  try {
    const { rating, comment } = req.body;
    const data: any = {};
    if (rating) data.rating = Number(rating);
    if (comment) data.comment = comment;

    const review = await prisma.review.update({
      where: { id: Number(req.params.id) },
      data
    });
    res.json(review);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer un avis
export const deleteReview = async (req: Request, res: Response) => {
  try {
    await prisma.review.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Avis supprimé' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};