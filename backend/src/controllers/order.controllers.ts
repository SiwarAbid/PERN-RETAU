import { Request, Response } from 'express';
import { prisma } from '../prisma';

interface OrderItem {
    dishId: number; // ID of the dish
    quantity: number; // Quantity of the dish ordered
    price: number; // Price per item
}
export const createOrder = async (req: Request, res: Response, { status, items }: { status?: string; items?: any[]; } /** the status it can be exist or not */ ) => {
    try {
        console.log('Creating order with items:', items);
        if (!items || items.length === 0) {
            items = req.body.items; // Get items from request body if not provided in parameters
        }
        const { orderData } = req.body;

        // Validate input
        if (!orderData || !items || items.length === 0) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // I have the name and last name of user but i haven't his id 
        // We will search the user by name and last name or by email
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { phone: orderData.customerInfo.phone },
                    { email: orderData.customerInfo.email }
                ]
            }
        });
        if (!user) {
            console.log('User not found, creating new user');   
        }
        // Found midding dishes by name
        const dishes = await prisma.dish.findMany({
            where: {
                name: {
                    in: items.map(item => item.price_data.product_data.name)
                }
            }
        });
        // Check if all dishes exist
        const dishNames = dishes.map(dish => dish.name);
        const missingDishes = items.filter(item => !dishNames.includes(item.price_data.product_data.name));
        let deliveryFee = null;
        if (missingDishes.length > 0) {
            // Vérifie si "Frais de livraison" est parmi les plats manquants
            const hasDeliveryFee = missingDishes.some(item => item.price_data.product_data.name === 'Frais de livraison');
            if (hasDeliveryFee) {
                deliveryFee = missingDishes.find(item => item.price_data.product_data.name === 'Frais de livraison');
                items = items.filter(item => item.price_data.product_data.name !== 'Frais de livraison');
            } else {
                return res.status(400).json({ error: `Missing dishes: ${missingDishes.map(item => item.price_data.product_data.name).join(', ')}` });
            }
        }

        
        // Create the order in the database
        const order = await prisma.order.create({
            data: {
                userId: user ? Number(user.id) : undefined,
                totalAmount: Number(orderData.finalTotal),
                items: {
                    create: items.map((item) => ({
                        dish: { connect: { name: item.price_data.product_data.name } },
                        quantity: Number(item.quantity),
                        price: Number(item.price_data.unit_amount)
                    }))
                },
                status: status || 'PENDING',
                deliveryFee: deliveryFee ? Number(deliveryFee.price_data.unit_amount) : 0,
            }
        });

        // Create payment in the database
        const payment = await prisma.payment.create({
            data: {
                order: { connect: { id: Number(order.id) } },
                amount: Number(orderData.finalTotal), // Assure-toi que c'est bien un entier
                paymentMethod: orderData.paymentMethod,
                status: status || 'PENDING'
            }
        });

        // Connect the payment to the order
        await prisma.order.update({
            where: { id: Number(order.id) },
            data: {
                payment: { connect: { id: Number(payment.id) } }
            }
        });

        // Ajout automatique des points de fidélité
        if (user) {
          // Récupérer les points actuels
          const loyalty = await prisma.loyaltyPoint.findFirst({
            where: { userId: user.id }
          });

          if (loyalty) {
            // Incrémenter les points existants
            await prisma.loyaltyPoint.update({
              where: { id: loyalty.id },
              data: { points: { increment: 10 } }
            });
          } else {
            // Créer l'entrée si elle n'existe pas
            await prisma.loyaltyPoint.create({
              data: {
                userId: user.id,
                points: 10
              }
            });
          }
        }

        // Return the created order
        return res.status(201).json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// export const getOrderById = async (req: Request, res: Response) => {
//     const { id } = req.params;

//     try {
//         const order = await prisma.order.findUnique({
//             where: { id: Number(id) },
//             include: {
//                 items: {
//                     include: {
//                         dish: true // Include dish details
//                     }
//                 },
//                 user: true, // Include user details
//                 payment: true // Include payment details
//             }
//         });

//         if (!order) {
//             return res.status(404).json({ error: 'Order not found' });
//         }

//         res.json(order);
//     } catch (error) {
//         console.error('Error fetching order:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

export const getOrders = async (req: Request, res: Response) => {
    try {
        console.log('Fetching all orders');
        const orders = await prisma.order.findMany({
            include: {
                items: {
                    include: {
                        dish: true // Include dish details
                    }
                },
                user: true, // Include user details
                payment: true // Include payment details
            }
        });

        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Update order status.
export const updateOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const order = await prisma.order.update({
            where: { id: Number(id) },
            data: { status }
        });

        res.json(order);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const deleteOrder = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.order.delete({
            where: { id: Number(id) }
        });

        res.status(204).send(); // No content
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}