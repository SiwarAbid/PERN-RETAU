import React from 'react';
import { ShoppingBag, Clock, CheckCircle, Star } from 'lucide-react';
import type { Order } from './order';

interface OrderStatsProps {
  orders: Order[];
}

export const OrderStats: React.FC<OrderStatsProps> = ({ orders }) => {
  const completedOrders = orders.filter(order => order.status === 'completed');
  const totalSpent = completedOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const activeOrders = orders.filter(order => ['preparing', 'ready'].includes(order.status));
  const averageRating = completedOrders.filter(order => order.rating).reduce((sum, order) => sum + (order.rating || 0), 0) / completedOrders.filter(order => order.rating).length || 0;

  const stats = [
    {
      title: 'Commandes totales',
      value: orders.length.toString(),
      icon: ShoppingBag,
      color: 'bg-orange-500',
      textColor: 'text-orange-600'
    },
    {
      title: 'En cours',
      value: activeOrders.length.toString(),
      icon: Clock,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Total dépensé',
      value: `${totalSpent.toFixed(2)} €`,
      icon: CheckCircle,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Note moyenne',
      value: averageRating ? `${averageRating.toFixed(1)}/5` : 'N/A',
      icon: Star,
      color: 'bg-rose-500',
      textColor: 'text-rose-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
              <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};