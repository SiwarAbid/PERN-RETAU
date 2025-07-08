import { Router } from "express";
import { 
    createRestau,
    getRestaus,
    getRestauById,
    updateRestau,
    deleteRestau,
} from "../controllers/restau.controllers";

const router = Router();

router.post('/add-restau', (req, res, next) => {
    createRestau(req, res).catch(next);
});

router.get('/restaus', getRestaus);
router.get('/restau/:id', (req, res, next) => {
    getRestauById(req, res).catch(next);
});

router.put('/update-restau/:id', updateRestau);
router.delete('/delete-restau/:id', deleteRestau);

export {router as restauRouter};