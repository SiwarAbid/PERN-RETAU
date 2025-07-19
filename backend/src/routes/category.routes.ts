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

router.get('/categories', getCategories);
router.get('/categorie/:id', (req, res, next) => {
  getCategoryById(req, res).catch(next);
});
router.put('/update-categorie/:id', upload.single('image'), updateCategory);
router.delete('/delete-categorie/:id', deleteCategory);

export {router as categoryRouter};