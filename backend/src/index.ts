import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import './config/passport.googleStrategy';
import './config/passport.facebookStrategy';
import './config/passport.appleStrategy';
import passport from 'passport';
import { prisma } from './prisma';
import { authRouter } from './routes/auth.routes';
import { userRouter } from './routes/user.routes';
import { categoryRouter } from './routes/category.routes';
import { dishRouter } from './routes/dish.routes';
import { reviewRouter } from './routes/review.routes';
import { restauRouter } from './routes/restau.routes';
import { contactRouter } from './routes/contact.routes';
import flash from 'connect-flash';

const app = express();
app.use(require('cors')({
  origin: 'http://localhost:5173',
  credentials: true
}));
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

app.use('/auth', authRouter);

app.use('/', userRouter);
app.use('/', categoryRouter);
app.use('/', dishRouter);
app.use('/', reviewRouter);
app.use('/', restauRouter);
app.use('/', contactRouter);

