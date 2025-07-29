import type { Order } from './order';

export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'CMD-2024-001',
    items: [
      { id: '1', name: 'Pizza Margherita', quantity: 2, price: 12.50, category: 'Pizza' },
      { id: '2', name: 'Salade César', quantity: 1, price: 8.90, category: 'Salade' },
      { id: '3', name: 'Coca-Cola', quantity: 2, price: 2.50, category: 'Boisson' }
    ],
    totalAmount: 36.40,
    status: 'completed',
    orderType: 'delivery',
    createdAt: new Date('2024-01-15T12:30:00'),
    completedAt: new Date('2024-01-15T13:15:00'),
    paymentMethod: 'card',
    notes: 'Livraison rapide demandée',
    rating: 5,
    review: 'Excellente pizza, livraison rapide !',
    canReorder: true,
    deliveryAddress: '123 Rue de la Paix, 75001 Paris'
  },
  {
    id: '2',
    orderNumber: 'CMD-2024-002',
    items: [
      { id: '4', name: 'Burger Classic', quantity: 1, price: 14.90, category: 'Burger' },
      { id: '5', name: 'Frites', quantity: 1, price: 4.50, category: 'Accompagnement' },
      { id: '6', name: 'Bière', quantity: 1, price: 3.80, category: 'Boisson' }
    ],
    totalAmount: 23.20,
    status: 'completed',
    orderType: 'dine-in',
    createdAt: new Date('2024-01-14T19:45:00'),
    completedAt: new Date('2024-01-14T20:10:00'),
    paymentMethod: 'cash',
    rating: 4,
    canReorder: true
  },
  {
    id: '3',
    orderNumber: 'CMD-2024-003',
    items: [
      { id: '7', name: 'Pasta Carbonara', quantity: 1, price: 13.50, category: 'Pasta' },
      { id: '8', name: 'Tiramisu', quantity: 2, price: 5.90, category: 'Dessert' }
    ],
    totalAmount: 25.30,
    status: 'preparing',
    orderType: 'takeaway',
    createdAt: new Date('2024-01-16T18:20:00'),
    estimatedDelivery: new Date('2024-01-16T19:00:00'),
    paymentMethod: 'online',
    canReorder: false
  },
  {
    id: '4',
    orderNumber: 'CMD-2024-004',
    items: [
      { id: '9', name: 'Steak Frites', quantity: 1, price: 18.90, category: 'Viande' },
      { id: '10', name: 'Salade verte', quantity: 1, price: 6.50, category: 'Salade' },
      { id: '11', name: 'Vin rouge', quantity: 1, price: 15.00, category: 'Boisson' }
    ],
    totalAmount: 40.40,
    status: 'ready',
    orderType: 'takeaway',
    createdAt: new Date('2024-01-16T20:30:00'),
    estimatedDelivery: new Date('2024-01-16T21:00:00'),
    paymentMethod: 'card',
    canReorder: true
  },
  {
    id: '5',
    orderNumber: 'CMD-2024-005',
    items: [
      { id: '12', name: 'Sushi Mix', quantity: 1, price: 22.90, category: 'Sushi' },
      { id: '13', name: 'Miso Soup', quantity: 1, price: 4.50, category: 'Soupe' }
    ],
    totalAmount: 27.40,
    status: 'cancelled',
    orderType: 'delivery',
    createdAt: new Date('2024-01-11T19:00:00'),
    paymentMethod: 'online',
    notes: 'Annulée par le client',
    canReorder: true,
    deliveryAddress: '456 Avenue des Champs, 75008 Paris'
  }
];