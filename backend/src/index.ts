import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bienvenue sur le backend du restaurant 🍽️');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});

import { prisma } from './prisma';

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

import authRoutes from './routes/auth.routes';

app.use('/auth', authRoutes);
