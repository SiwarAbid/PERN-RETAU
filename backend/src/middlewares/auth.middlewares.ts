import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma';
import'dotenv/config';


interface JwtPayload {
  id: number;
}

// Middleware pour protéger les routes
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 1. Récupérer le token du header (format: "Bearer TOKEN")
      token = req.headers.authorization.split(' ')[1];

      // 2. Vérifier le token avec votre clé secrète
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

      // 3. Trouver l'utilisateur associé au token et l'attacher à la requête
      // On exclut le mot de passe pour la sécurité
      let user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, email: true, name: true, role: true, provider: true, createdAt: true, updatedAt: true },
      });

      if (!user) {
        return res.status(401).json({ message: 'Utilisateur non trouvé, autorisation refusée' });
      }

      next(); // L'utilisateur est authentifié, on passe à la suite
    } catch (error) {
      return res.status(401).json({ message: 'Token non valide, autorisation refusée' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Aucun token, autorisation refusée' });
  }
};