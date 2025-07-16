export interface Restau {
    id: number,
    name: string,
    aboutUs: string,
    address: string,
    phone: string,
    email: string,
    image: string,
    description: string,
    logo: string,
}

export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  isAvailable: boolean;
  image?: string;
  reviews?: Review[];
  rating?: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  dishes: Dish[];
}

export interface Review {
  id: number;
  dish: Dish;
  rating: number;
  comment: string;
  user: User;
}

export type Role = 'CLIENT' | 'ADMIN' | 'CHEF';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  image?: string | null;
  phone?: string | null;
  address?: string | null;
  provider: string;
  role: Role;
  createdAt?: string; // ISO string, Date possible côté backend
  updatedAt?: string | null;
  lastVisit?: string | null;
  isActived?: boolean;
}