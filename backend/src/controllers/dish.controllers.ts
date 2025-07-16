import { Request, Response } from 'express';
import { prisma } from '../prisma';
import { upload } from '../middlewares/upload';
// Créer un nouveau plat
export const createDish = async (req: Request, res: Response) => {
  try {
    console.log("req.body :",req.body);
    const { name, category, ...otherFields } = req.body;
    
    if (!name) {
      console.log("Nom requis");
      return res.status(400).json({ error: 'Nom requis' });
    }

    const existingDish = await prisma.dish.findFirst({ where: { name }, include: { category: true } });
    if (existingDish) return res.status(400).json({ error: 'Nom déjà utilisé' });

    if (otherFields.isAvailable === 'true') otherFields.isAvailable = true;
    else if (otherFields.isAvailable === 'false') otherFields.isAvailable = false;
    else otherFields.isAvailable = true;


    // Gestion de l'image via Multer
    if (!req.file) return res.status(400).json({ error: 'Image requise' });
    const imagePath = req.file.filename;
    otherFields.image = imagePath;

    if (otherFields.price) 
      otherFields.price = Number(otherFields.price);
    else return res.status(400).json({ error: 'Prix requis' });

    console.log("name :",name);
    console.log("otherFields :",otherFields, "cateeg", category);
    const dish = await prisma.dish.create({
      data: {
        name, 
        price: Number(otherFields.price), 
        category: {
          connectOrCreate: {
            where: { name: category }, // ⚠️ ce champ doit être unique dans le modèle Category
            create: { name: category }
          }
        },
        ...otherFields}, 
      include: {
        category: true
      }
    });
    console.log("dish created :",dish);
    res.status(201).json(dish);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer tous les plats
export const getDishes = async (_req: Request, res: Response) => {
  try {
    const dishes = await prisma.dish.findMany({
    include: {
    category: true
  }});
  console.log("Dishes :",dishes);
  res.json(dishes);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer un plat par ID
export const getDishById = async (req: Request, res: Response) => {
  try {
    const dish = await prisma.dish.findUnique({ where: { id: Number(req.params.id) } });
    if (!dish) return res.status(404).json({ error: 'Plat non trouvé' });
    res.json(dish);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour un plat
export const updateDish = async (req: Request, res: Response) => {
  try {
    const { name, description, price, categoryId } = req.body;
    const data: any = {};
    if (name) data.name = name;
    if (description) data.description = description;
    if (price) data.price = Number(price);
    if (categoryId) data.categoryId = Number(categoryId);

    const dish = await prisma.dish.update({
      where: { id: Number(req.params.id) },
      data
    });
    res.json(dish);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer un plat
export const deleteDish = async (req: Request, res: Response) => {
  try {
    await prisma.dish.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Plat supprimé' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

type DishWithCategoryName = {
  id: number;
  idCategory: number;
};

export async function linkDishesToCategories(dishes: DishWithCategoryName[]) {
  for (const dish of dishes) {
    await prisma.dish.update({
      where: { id: dish.id },
      data: {
        category: {
          connect: {
             id: dish.idCategory
          }
        }
      }
    });
    console.log(`✅ Dish ${dish.id} linked to category "${dish.idCategory}"`);
  }
}