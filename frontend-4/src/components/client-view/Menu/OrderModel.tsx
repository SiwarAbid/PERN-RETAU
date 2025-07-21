import React, { useState } from 'react';
import { X, MapPin, CreditCard, Wallet, User, Phone, Mail, Home } from 'lucide-react';
import type { CartItem } from '../../../pages/Menu';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onConfirmOrder: (orderData: OrderData) => void;
}

export interface OrderData {
  orderType: 'delivery' | 'takeaway';
  paymentMethod: 'cash' | 'card';
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: string;
    city?: string;
    postalCode?: string;
  };
  saveInfo: boolean;
  total: number;
  deliveryFee: number;
  finalTotal: number;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, cartItems, onConfirmOrder }) => {
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('card');
  const [saveInfo, setSaveInfo] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = subtotal * 0.1;
  const total = subtotal - discount;
  const deliveryFee = orderType === 'delivery' ? 3.50 : 0;
  const finalTotal = total + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || !customerInfo.phone) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (orderType === 'delivery' && (!customerInfo.address || !customerInfo.city || !customerInfo.postalCode)) {
      alert('Veuillez remplir l\'adresse complète pour la livraison');
      return;
    }

    const orderData: OrderData = {
      orderType,
      paymentMethod,
      customerInfo,
      saveInfo,
      total,
      deliveryFee,
      finalTotal
    };

    onConfirmOrder(orderData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto hide-scrollbar">
        <div className="top-0 bg-white p-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-800">Finaliser la commande</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Type de commande */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-500" />
              Type de commande
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  orderType === 'delivery'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🚚</div>
                  <div className="font-medium">Livraison</div>
                  <div className="text-sm text-gray-500">+5.0 TND frais</div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setOrderType('takeaway')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  orderType === 'takeaway'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🏃‍♂️</div>
                  <div className="font-medium">À emporter</div>
                  <div className="text-sm text-gray-500">Gratuit</div>
                </div>
              </button>
            </div>
          </div>

          {/* Méthode de paiement */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-green-500" />
              Méthode de paiement
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {orderType === 'delivery' && (
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'cash'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <Wallet className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <div className="font-medium">Espèces</div>
                    <div className="text-sm text-gray-500">À la livraison</div>
                  </div>
                </button>
              )}
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${orderType === 'takeaway' ? 'col-span-2' : ''}`}
              >
                <div className="text-center">
                  <CreditCard className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <div className="font-medium">Carte bancaire</div>
                  <div className="text-sm text-gray-500">Paiement sécurisé Stripe</div>
                </div>
              </button>
            </div>
            {orderType === 'takeaway' && (
              <p className="text-sm text-orange-600 mt-2 bg-orange-50 p-3 rounded-lg">
                ⚠️ Le paiement en ligne est obligatoire pour les commandes à emporter
              </p>
            )}
          </div>

          {/* Informations client */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-500" />
              Vos informations
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom <p className='text-red-500 text-xs'>*</p>
                </label>
                <input
                  type="text"
                  required
                  value={customerInfo.firstName}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Votre prénom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom <p className='text-red-500 text-xs'>*</p>
                </label>
                <input
                  type="text"
                  required
                  value={customerInfo.lastName}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email <p className='text-red-500 text-xs'>*</p>
                </label>
                <input
                  type="email"
                  required
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Téléphone <p className='text-red-500 text-xs'>*</p>
                </label>
                <input
                  type="tel"
                  required
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="06 12 34 56 78"
                />
              </div>
            </div>

            {/* Adresse de livraison */}
            {orderType === 'delivery' && (
              <div className="mt-4 space-y-4">
                <h4 className="font-medium text-gray-700 flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Adresse de livraison <p className='text-red-500 text-xs'>*</p>
                </h4>
                <div>
                  <input
                    type="text"
                    required
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Numéro et nom de rue"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={customerInfo.city}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Ville"
                  />
                  <input
                    type="text"
                    required
                    value={customerInfo.postalCode}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, postalCode: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Code postal"
                  />
                </div>
              </div>
            )}

            {/* Sauvegarder les informations */}
            <div className="mt-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                  className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">
                  Sauvegarder mes informations pour les prochaines commandes
                </span>
              </label>
            </div>
          </div>

          {/* Récapitulatif */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold mb-3">Récapitulatif de la commande</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{subtotal.toFixed(2)} TND</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Remise (10%)</span>
                <span>-{discount.toFixed(2)} TND</span>
              </div>
              {orderType === 'delivery' && (
                <div className="flex justify-between">
                  <span>Frais de livraison</span>
                  <span>{deliveryFee.toFixed(2)} TND</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-orange-500">{finalTotal.toFixed(2)} TND</span>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-6 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-6 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
            >
              {paymentMethod === 'card' ? 'Payer maintenant' : 'Confirmer la commande'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;