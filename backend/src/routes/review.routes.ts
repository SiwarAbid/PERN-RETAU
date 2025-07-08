import { Router } from "express";
import {
    createReview,
    getReviews,
    getReviewById,
    updateReview,
    deleteReview,
} from "../controllers/review.controllers";


const router = Router();

router.post('/add-review', (req, res, next) => {
    createReview(req, res).catch(next);
});

router.get('/reviews', getReviews);
router.get('/review/:id', (req, res, next) => {
    getReviewById(req, res).catch(next);
});

router.put('/update-review/:id', updateReview);
router.delete('/delete-review/:id', deleteReview);

export {router as reviewRouter};