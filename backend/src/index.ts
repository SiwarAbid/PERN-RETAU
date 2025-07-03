import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import './config/passport';
import passport from 'passport';
import { prisma } from './prisma';
import authRoutes from './routes/auth.routes';
import flash from 'connect-flash';

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Bienvenue sur le backend du restaurant 🍽️');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});


app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});
app.use(flash());
app.use(passport.initialize());

app.use('/auth', authRoutes);


