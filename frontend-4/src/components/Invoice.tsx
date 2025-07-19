import React from 'react';
import { X, MapPin, Clock, Phone, Mail, CreditCard, Wallet, ChefHat } from 'lucide-react';
import type { CartItem } from '../pages/Menu';
import type { OrderData } from './OrderModel';

interface InvoiceProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  orderData: OrderData;
  orderNumber: string;
}

const Invoice: React.FC<InvoiceProps> = ({ isOpen, onClose, cartItems, orderData, orderNumber }) => {
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const estimatedTime = orderData.orderType === 'delivery' ? '30-45 min' : '15-20 min';

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto hide-scrollbar">
        <div className="top-0 bg-white p-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-green-600">✅ Commande confirmée</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* En-tête de facture */}
          <div className="text-center pb-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <ChefHat className="icon-lg icon-primary" />
              <span className="text-3xl font-bold text-gray-800">SWEET CORNER</span>
            </div>
            <p className="text-gray-600">Restaurant • Fresh & Healthy Food</p>
            <p className="text-sm text-gray-500">123 Rue de la Joie, 4253 Kébilli</p>
            <p className="text-sm text-gray-500">Tél: 23 772 951</p>
          </div>

          {/* Informations de commande */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Détails de la commande</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">N° de commande:</span>
                  <span className="font-mono font-bold">{orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span>{currentDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Type:</span>
                  <span className="flex items-center gap-1">
                    {orderData.orderType === 'delivery' ? (
                      <>
                        <MapPin className="w-4 h-4 text-blue-500" />
                        Livraison
                      </>
                    ) : (
                      <>
                        🏃‍♂️ À emporter
                      </>
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Temps estimé:</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-orange-500" />
                    {estimatedTime}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Paiement:</span>
                  <span className="flex items-center gap-1">
                    {orderData.paymentMethod === 'card' ? (
                      <>
                        <CreditCard className="w-4 h-4 text-green-500" />
                        Carte bancaire
                      </>
                    ) : (
                      <>
                        <Wallet className="w-4 h-4 text-green-500" />
                        Espèces
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Informations client</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Nom:</span>
                  <span className="ml-2 font-medium">
                    {orderData.customerInfo.firstName} {orderData.customerInfo.lastName}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{orderData.customerInfo.phone}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{orderData.customerInfo.email}</span>
                </div>
                {orderData.orderType === 'delivery' && orderData.customerInfo.address && (
                  <div className="mt-2">
                    <div className="flex items-start gap-1">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <div>{orderData.customerInfo.address}</div>
                        <div>{orderData.customerInfo.postalCode} {orderData.customerInfo.city}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Articles commandés */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Articles commandés</h3>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-500">{item.price.toFixed(2)} TND × {item.quantity}</p>
                    </div>
                  </div>
                  <div className="font-medium text-gray-800">
                    {(item.price * item.quantity).toFixed(2)} TND
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sous-total</span>
                <span>{orderData.total.toFixed(2)} TND</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>Remise (10%)</span>
                <span>-{(orderData.total * 0.1 / 0.9).toFixed(2)} TND</span>
              </div>
              {orderData.deliveryFee > 0 && (
                <div className="flex justify-between text-sm">
                  <span>Frais de livraison</span>
                  <span>{orderData.deliveryFee.toFixed(2)} TND</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total payé</span>
                <span className="text-green-600">{orderData.finalTotal.toFixed(2)} TND</span>
              </div>
            </div>
          </div>

          {/* Message de remerciement */}
          <div className="text-center bg-green-50 rounded-xl p-6">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-xl font-bold text-green-700 mb-2">Merci pour votre commande !</h3>
            <p className="text-green-600 mb-4">
              {orderData.orderType === 'delivery' 
                ? 'Votre commande sera livrée dans les temps indiqués.'
                : 'Votre commande sera prête pour le retrait dans les temps indiqués.'
              }
            </p>
            <p className="text-sm text-gray-600">
              Un email de confirmation a été envoyé à {orderData.customerInfo.email}
            </p>
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-4">
            <button
              onClick={handlePrint}
              className="flex-1 py-3 px-6 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              🖨️ Imprimer
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;