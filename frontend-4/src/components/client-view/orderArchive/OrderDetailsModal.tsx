import React, { useState } from 'react';
import { X, Calendar, MapPin, CreditCard, FileText, Star } from 'lucide-react';
import type { Order } from './order';

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, isOpen, onClose }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  if (!isOpen || !order) return null;

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

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'cash':
        return 'Espèces';
      case 'card':
        return 'Carte bancaire';
      case 'online':
        return 'Paiement en ligne';
      default:
        return method;
    }
  };

  const renderStars = (currentRating: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${interactive ? 'cursor-pointer' : ''} ${
          i < currentRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
        onClick={interactive ? () => setRating(i + 1) : undefined}
      />
    ));
  };

  const handleSubmitReview = () => {
    // Ici vous pourriez envoyer la note et l'avis au serveur
    console.log('Review submitted:', { rating, review });
    setShowReviewForm(false);
    setRating(0);
    setReview('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Ma commande</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* En-tête de commande */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {order.orderNumber}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Commandée le {new Date(order.createdAt).toLocaleDateString('fr-FR')}</span>
                <span>à {new Date(order.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              {order.completedAt && (
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <Calendar className="w-4 h-4" />
                  <span>Livrée le {new Date(order.completedAt).toLocaleDateString('fr-FR')}</span>
                  <span>à {new Date(order.completedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              )}
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
              {getStatusText(order.status)}
            </span>
          </div>

          {/* Détails de livraison */}
          <div className="bg-orange-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Détails de livraison</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>{getOrderTypeText(order.orderType)}</span>
              </div>
              {order.deliveryAddress && (
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-orange-500 mt-0.5" />
                  <span>{order.deliveryAddress}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <CreditCard className="w-4 h-4 text-orange-500" />
                <span>{getPaymentMethodText(order.paymentMethod)}</span>
              </div>
            </div>
          </div>

          {/* Articles commandés */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Articles commandés</h4>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-800">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.category}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-800">
                      {item.quantity} × {item.price.toFixed(2)} €
                    </div>
                    <div className="text-sm font-semibold text-orange-600">
                      {(item.quantity * item.price).toFixed(2)} €
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="bg-rose-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-rose-500" />
                <h4 className="font-semibold text-gray-800">Notes</h4>
              </div>
              <p className="text-sm text-gray-600">{order.notes}</p>
            </div>
          )}

          {/* Avis et note */}
          {order.status === 'completed' && (
            <div className="bg-yellow-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800">Mon avis</h4>
                {!order.rating && !showReviewForm && (
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Donner mon avis
                  </button>
                )}
              </div>
              
              {order.rating && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {renderStars(order.rating)}
                    </div>
                    <span className="text-sm text-gray-600">({order.rating}/5)</span>
                  </div>
                  {order.review && (
                    <p className="text-sm text-gray-700 italic">"{order.review}"</p>
                  )}
                </div>
              )}

              {showReviewForm && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Note
                    </label>
                    <div className="flex gap-1">
                      {renderStars(rating, true)}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Commentaire (optionnel)
                    </label>
                    <textarea
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      placeholder="Partagez votre expérience..."
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSubmitReview}
                      disabled={rating === 0}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      Publier mon avis
                    </button>
                    <button
                      onClick={() => {
                        setShowReviewForm(false);
                        setRating(0);
                        setReview('');
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Total */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-800">Total</span>
              <span className="text-2xl font-bold text-orange-600">
                {order.totalAmount.toFixed(2)} €
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};