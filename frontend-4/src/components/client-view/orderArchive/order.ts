export interface OrderItem {
  id: string;
  dishId: number;
  quantity: number;
  price: number; // Stocké en centimes
}

export interface Order {
  id: string;
  userId: number | null;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'COMPLETED' | 'CANCELLED' | 'PENDING' | 'REFUNDED' | 'PREPARING' | 'READY';
  orderType: 'dine-in' | 'takeaway' | 'delivery';
  createdAt: Date;
  completedAt?: Date;
  payment?: {
    id: string;
    method: 'CASH' | 'CARD' | 'ONLINE';
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
    amount: number; // Stocké en centimes
  };
  notes?: string;
  rating?: number;
  review?: string;
  canReorder: boolean;
  deliveryAddress?: string;
  deliveryFee?: number; // Stocké en centimes
}

export interface OrderFilters {
  dateFrom?: Date;
  dateTo?: Date;
  status?: string;
  orderType?: string;
  search?: string;
}