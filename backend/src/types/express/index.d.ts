import { User as PrismaUser } from '@prisma/client';

// Pour étendre le type Request d'Express et y ajouter la propriété `user`
declare global {
  namespace Express {
    export interface Request {
      user?: Omit<PrismaUser, 'password'> | null;
    }
  }
}