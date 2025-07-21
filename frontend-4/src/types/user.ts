export type Role = 'CLIENT' | 'ADMIN' | 'CHEF' | 'EMPLOYEE' | 'SOUS_CHEF' | 'SERVER' | 'AGENT';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  image?: string;
  phone?: string;
  address?: string;
  provider: string;
  role: Role;
  createdAt?: string; // ISO string, Date possible côté backend
  updatedAt?: string;
  lastVisit?: string;
  isActived?: boolean;
  salary?: number;
  dateEmbauche?: string;
  isFeaturedChef?: boolean;
  description?: string 
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  salary: number;
  hireDate: string;
  status: 'active' | 'inactive';
  department: 'kitchen' | 'service' | 'management' | 'cleaning';
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
}

export interface Review {
  id: number;
  dish: Dish;
  rating: number;
  comment: string;
  user: User;
}

export interface RestaurantInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  openingHours: string;
  website?: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface Message {
  id: string;
  from: string;
  to: string;
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface ActivityLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  resource: string;
  details: string;
  timestamp: string;
}

export interface Sale {
  id: string;
  date: string;
  total: number;
  items: Array<{
    dish: string;
    quantity: number;
    price: number;
  }>;
  clientId?: string;
}