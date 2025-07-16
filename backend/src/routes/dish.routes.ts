import {
    createDish,
    getDishes,
    getDishById,
    updateDish,
    deleteDish,
    linkDishesToCategories,
} from '../controllers/dish.controllers'
import { Router } from 'express';
// import { prisma } from '../prisma';
import { upload } from '../middlewares/upload';

const router = Router();

router.post('/add-dish', upload.single('image'), (req, res, next) => {
    createDish(req, res).catch(next);
});

router.get('/dishes', getDishes);
router.get('/dish/:id', (req, res, next) => {
    getDishById(req, res).catch(next);
});

router.put('/update-dish/:id', updateDish);
router.delete('/delete-dish/:id', deleteDish);

// router.put('/link-dishes-to-categories', async (req, res) => {
//     try {
//       const dishes = req.body;
//       console.log('Dishes to link:', dishes);
//       await linkDishesToCategories(dishes);
//       res.status(200).json({ message: 'Dishes linked to categories successfully' });
//     } catch (error) {
//       console.error('Error linking dishes to categories:', error);
//       res.status(500).json({ error: 'An error occurred while linking dishes to categories' });
//     }
//   })

// router.get("/dishoo", async (req, res) => {
// const dish = await prisma.dish.findUnique({
//   where: { id: 3 },
//   include: {
//     category: true
//   }
// });

// console.log(dish?.category?.name); // 👉 Affiche le nom de la catégorie
// });
export { router as dishRouter }