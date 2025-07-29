// Router for orders
import express from 'express';
import { createOrder, getOrders, updateOrder, deleteOrder } from '../controllers/order.controllers';
import { Router } from 'express';

const router = Router();

router.post('/', async(req, res) => {
    console.log('createOrder');
    createOrder(req, res, {});
});
// router.get('/:id', async(req, res) => {
//     getOrderById(req, res);
// });
router.get('/orders', async(req, res) => {
    getOrders(req, res);
});
router.put('/:id', async(req, res) => {
    updateOrder(req, res);
});
router.delete('/:id', async(req, res) => {
    deleteOrder(req, res);
});

export default router;
