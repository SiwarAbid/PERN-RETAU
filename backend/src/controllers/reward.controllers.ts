import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export class RewardController {
  async createReward(req: Request, res: Response) {
    const { userId, type } = req.body;
    try {
      const newReward = await prisma.reward.create({ data: { userId: Number(userId), type } });
      res.status(201).json(newReward);
    } catch (error) {
      res.status(500).json({ message: 'Error creating reward', error });
    }
  }

  async getRewards(req: Request, res: Response) {
    try {
      const rewards = await prisma.reward.findMany();
      res.status(200).json(rewards);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching rewards', error });
    }
  }

  async updateReward(req: Request, res: Response) {
    const { id } = req.params;
    const { type, used } = req.body;
    try {
      const reward = await prisma.reward.update({ where: { id: Number(id) }, data: { type, used } });
      if (!reward) {
        return res.status(404).json({ message: 'Reward not found' });
      }
      return res.status(200).json(reward);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating reward', error });
    }
  }

  async deleteReward(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.reward.delete({
        where: { id: Number(id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting reward', error });
    }
  }
}