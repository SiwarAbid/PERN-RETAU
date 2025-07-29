import { Router } from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controllers';
import { upload } from '../middlewares/upload';

const router = Router();

router.post('/add-category',upload.single('image'), (req, res, next) => {
  createCategory(req, res).catch(next);
});

router.get('/categories', (req, res) => {
  getCategories(req, res)
});
router.get('/categorie/:id', (req, res, next) => {
  getCategoryById(req, res).catch(next);
});
router.put('/update-categorie/:id', upload.single('image'), (req, res) => {
  updateCategory(req, res)
});
router.delete('/delete-categorie/:id', (req, res) => {
  deleteCategory(req, res)
});

export {router as categoryRouter};