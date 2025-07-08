import {
    createDish,
    getDishes,
    getDishById,
    updateDish,
    deleteDish,
} from '../controllers/dish.controllers'
import { Router } from 'express';

const router = Router();

router.post('/add-dish', (req, res, next) => {
    createDish(req, res).catch(next);
});

router.get('/dishes', getDishes);
router.get('/dishe/:id', (req, res, next) => {
    getDishById(req, res).catch(next);
});

router.put('/update-dishe/:id', updateDish);
router.delete('/delete-dishe/:id', deleteDish);

export { router as dishRouter }