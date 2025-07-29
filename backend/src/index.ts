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
import paymentRouter from './config/payementStripe';
import flash from 'connect-flash';
import Stripe from 'stripe';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
// Configuration CORS dynamique
const allowedOrigins = ['http://localhost:5173', process.env.FRONTEND_URL_LOCAL];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Bienvenue sur le backend du restaurant 🍽️');
});

const HOST = '0.0.0.0'; // Permet d'écouter sur toutes les interfaces réseau
const PORT = process.env.PORT || 5000;

app.listen(Number(PORT), HOST, () => {
  console.log(`🚀 Serveur démarré et accessible sur le réseau à l'adresse http://${process.env.BACKEND_URL?.split('//')[1]}`);
  console.log(`Autorise les requêtes depuis : ${allowedOrigins.join(' et ')}`);
});

app.use(flash());
app.use(passport.initialize());
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

app.use('/auth', authRouter);

app.use('/', userRouter);
app.use('/', categoryRouter);
app.use('/', dishRouter);
app.use('/', reviewRouter);
app.use('/', restauRouter);
app.use('/', contactRouter);
app.use('/', paymentRouter);
app.use('/', require('./routes/order.routes').default);
app.use('/', require('./routes/reward.routes').default);
app.use('/', require('./routes/loyalty.routes').default);

       


