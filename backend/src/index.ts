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
app.use('/', paymentRouter)

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY!);

// This is the endpoint your frontend is trying to call
app.post('/create-checkout-session', async (req, res) => {
    try {
        // --- This is where you would get the cart items from the request body ---
        // For this example, we'll hardcode some items for simplicity.
        // In a real application, you would receive `req.body.cartItems` and
        // validate them against your database to prevent price manipulation.
        const lineItems = req.body.items.map((item: any) => {
            // Calcul du prix après réduction et conversion en centimes (entier)
            const discountedPrice = item.price - (item.price * 0.1); // Applique 10% de réduction
            const unitAmountInCents = Math.round(discountedPrice * 100); // Convertit en centimes et arrondit

            return {
                price_data: {
                currency: 'eur', // Change to your desired currency
                product_data: {
                    name: item.name,
                    images: item.image ? [`http://localhost:5000/uploads/${item.image}`] : [],
                },
                unit_amount: unitAmountInCents, 
            },
            quantity: item.quantity,
        }
        });
        const deliveryFee = req.body.deliveryFee
        if (deliveryFee && deliveryFee > 0) 
            lineItems.push({
                price_data: {
                    currency: 'eur', // Change to your desired currency
                    product_data: {
                        name: 'Frais de livraison',
                    images: ['http://localhost:5000/uploads/delivery.png'], // Example image
                },
                unit_amount: deliveryFee * 100, // 3.5 eur delivery
            },
            quantity: 1,
        }); 

        // --- Validate the line items ---
        if (!lineItems || lineItems.length === 0) {
            throw new Error('No line items provided.');
        }
        // --- Log the line items for debugging ---
        console.log("Line Items: ", lineItems);

        // --- Create the Stripe Checkout Session ---
        // Créer la session de paiement Stripe
        const session = await stripeInstance.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            ui_mode: 'embedded',
            return_url: `http://localhost:5173/accueil?session_id={CHECKOUT_SESSION_ID}`,
        });
        console.log("Session: ", session);

        // Vérifier si le client_secret est présent et le renvoyer au frontend
        if (session && session.client_secret) {
            console.log('Session Stripe créée avec succès. Client secret:', session.client_secret);
            res.json({ checkoutSessionClientSecret: session.client_secret }); // Le frontend attend 'clientSecret'
        } else {
            console.error('La session Stripe a été créée, mais le client_secret est manquant ou invalide.');
            res.status(500).json({ error: 'Impossible de récupérer le client secret.' });
        }

    } catch (error: any) {
        console.error('Erreur lors de la création de la session de paiement:', error);
        res.status(500).json({ error: error.message });
    }
});

       


