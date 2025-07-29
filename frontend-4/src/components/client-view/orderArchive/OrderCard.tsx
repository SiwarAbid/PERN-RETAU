import React from 'react';
import { Calendar, MapPin, Clock, Star, RotateCcw, Eye } from 'lucide-react';
import type { Order } from './order';

interface OrderCardProps {
  order: Order;
  onViewDetails: (order: Order) => void;
  onReorder?: (order: Order) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onViewDetails, onReorder }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'ready':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Livrée';
      case 'preparing':
        return 'En préparation';
      case 'ready':
        return 'Prête';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

  const getOrderTypeText = (type: string) => {
    switch (type) {
      case 'dine-in':
        return 'Sur place';
      case 'takeaway':
        return 'À emporter';
      case 'delivery':
        return 'Livraison';
      default:
        return type;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 hover:shadow-md transition-all duration-200 hover:border-orange-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {order.orderNumber}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{new Date(order.createdAt).toLocaleDateString('fr-FR')}</span>
            <span className="text-gray-400">•</span>
            <span>{new Date(order.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
          {getStatusText(order.status)}
        </span>
      </div>

      {order.estimatedDelivery && ['preparing', 'ready'].includes(order.status) && (
        <div className="bg-yellow-50 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-yellow-800">
            <Clock className="w-4 h-4" />
            <span className="font-medium">
              {order.status === 'ready' ? 'Prête depuis' : 'Prête vers'} {' '}
              {new Date(order.estimatedDelivery).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      )}

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-orange-500" />
          <span>{getOrderTypeText(order.orderType)}</span>
          {order.deliveryAddress && (
            <>
              <span className="text-gray-400">•</span>
              <span className="truncate">{order.deliveryAddress}</span>
            </>
          )}
        </div>

        {order.rating && order.status === 'completed' && (
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {renderStars(order.rating)}
            </div>
            <span className="text-sm text-gray-600">({order.rating}/5)</span>
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-2">
          {order.items.length} article{order.items.length > 1 ? 's' : ''}
        </div>
        <div className="space-y-1">
          {order.items.slice(0, 2).map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-700">{item.quantity}x {item.name}</span>
              <span className="text-gray-600">{(item.quantity * item.price).toFixed(2)} €</span>
            </div>
          ))}
          {order.items.length > 2 && (
            <div className="text-sm text-gray-500">
              +{order.items.length - 2} autre{order.items.length - 2 > 1 ? 's' : ''} article{order.items.length - 2 > 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-xl font-bold text-orange-600">
          {order.totalAmount.toFixed(2)} €
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onViewDetails(order)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            <Eye className="w-4 h-4" />
            Détails
          </button>
          {order.canReorder && onReorder && (
            <button
              onClick={() => onReorder(order)}
              className="flex items-center gap-2 px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              Recommander
            </button>
          )}
        </div>
      </div>
    </div>
  );
};