import type { Category } from './user';

export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  createdAt: Date;
  rating: number;
  isAvailable: boolean;
}

export interface TopDish {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: Category;
  rating: number;
  badge: string;
  createdAt: Date;
  isAvailble: boolean;
}