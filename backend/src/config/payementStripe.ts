import { Request, Response } from 'express';
import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { createOrder } from '../controllers/order.controllers';
import { create } from 'domain';
dotenv.config();

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY || '');
export const paymentStripe = async (req: Request, res: Response) => {
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
                    images: item.image ? [`${process.env.BACKEND_URL}/uploads/${item.image}`] : [],
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
                        images: [`${process.env.BACKEND_URL}/uploads/delivery.png`], // Example image
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
            return_url: `${process.env.FRONTEND_URL_LOCAL || 'http://localhost:5173'}/accueil?session_id={CHECKOUT_SESSION_ID}`,
        });
        console.log("Session: ", session);

        // Vérifier si le client_secret est présent et le renvoyer au frontend
        if (session && session.client_secret) {
            console.log('Session Stripe créée avec succès. Client secret:', session.client_secret);
            // Ajouter Order to BD
            createOrder(req, res, { status: 'DONE', items: lineItems });
            res.json({ checkoutSessionClientSecret: session.client_secret }); // Le frontend attend 'clientSecret'
        } else {
            console.error('La session Stripe a été créée, mais le client_secret est manquant ou invalide.');
            return res.status(500).json({ error: 'Impossible de récupérer le client secret.' });
        }

    } catch (error: any) {
        console.error('Erreur lors de la création de la session de paiement:', error);
        return res.status(500).json({ error: error.message });
    }
}

const paymentRouter = express.Router();
// Helper to wrap async route handlers
const asyncHandler = (fn: any) => (req: Request, res: Response, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

paymentRouter.post('/create-checkout-session', asyncHandler(paymentStripe));
export default paymentRouter;
// This is the endpoint your frontend is trying to call
