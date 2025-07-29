import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class LoyaltyPointController {
  async createLoyaltyPoint(req: Request, res: Response) {
    const { userId, points } = req.body;
    try {
      const loyaltyPoint = await prisma.loyaltyPoint.create({
        data: {
          userId,
          points,
        },
      });
      res.status(201).json(loyaltyPoint);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create loyalty point' });
    }
  }

  async getLoyaltyPoints(req: Request, res: Response) {
    try {
      const loyaltyPoints = await prisma.loyaltyPoint.findMany();
      res.status(200).json(loyaltyPoints);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve loyalty points' });
    }
  }

  async updateLoyaltyPoint(req: Request, res: Response) {
    const { id } = req.params;
    const { points } = req.body;
    try {
      const loyaltyPoint = await prisma.loyaltyPoint.update({
        where: { id: Number(id) },
        data: { points },
      });
      res.status(200).json(loyaltyPoint);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update loyalty point' });
    }
  }

  async deleteLoyaltyPoint(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.loyaltyPoint.delete({
        where: { id: Number(id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete loyalty point' });
    }
  }
}