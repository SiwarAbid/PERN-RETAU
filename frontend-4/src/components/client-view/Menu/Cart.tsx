import React, { useEffect } from 'react';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import type { Category } from '../../../types/user';
import OrderModal, { type OrderData } from './OrderModel';
import Invoice from './Invoice';
import { useMessageAlert } from '../../../hooks/useMessage';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: Category;
}

export interface CartProps {
  onUpdateQuantity: (name: string, quantity: number) => void;
  onCheckout?: () => void;
  onClearCart: () => void;
}

const Cart: React.FC<CartProps> = ({ onUpdateQuantity, onClearCart }) => {
  const [isLaunching, setIsLaunching] = React.useState(false);
  const [showOrderModal, setShowOrderModal] = React.useState(false);
  const [showInvoice, setShowInvoice] = React.useState(false);
  const [orderData, setOrderData] = React.useState<OrderData | null>(null);
  const [orderNumber, setOrderNumber] = React.useState('');
  const items: CartItem[] = JSON.parse(localStorage.getItem('cartItems')
  ? localStorage.getItem('cartItems') as string
  : '[]');
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = total * 0.1; // 10% discount ( pour ces qui passer leurs commandes sur nos sites )
  const final = total - discount;
  const { alert: alertMessage } = useMessageAlert();

  const handleCheckout = () => {
    if (items.length === 0) {
      alertMessage({typeMsg: 'warning', messageContent: 'Votre panier est vide !'});
      return;
    }
    setIsLaunching(true);
    setShowOrderModal(true);

    // Simuler un temps de chargement ou une animation
    setTimeout(() => {
      setIsLaunching(false);
    }, 2000); // 2 secondes pour l'animation
  };

  const handleConfirmOrder = async (orderData: OrderData, e: React.FormEvent) => {
    e.preventDefault();
    setOrderData(orderData);
    // Ceci est pour les paiements hors-ligne (ex: espèces)
    // Nous devons afficher la facture.
    const orderNum = `SC${Date.now().toString().slice(-6)}`;
    setOrderNumber(orderNum);
    setShowOrderModal(false);
    setShowInvoice(true);
  };

    useEffect(() => {
      const query = new URLSearchParams(window.location.search);
      const sessionId = query.get('session_id');
  
      if (sessionId) {
        alertMessage({typeMsg: 'success', messageContent: 'Votre commande a été passée avec succès !'});
        setShowOrderModal(false);
        const pendingOrderDataString = sessionStorage.getItem('pendingOrderData');
        if (pendingOrderDataString) {
          const pendingOrderData = JSON.parse(pendingOrderDataString);
          setOrderData(pendingOrderData);
          setShowInvoice(true);
          sessionStorage.removeItem('pendingOrderData'); // Nettoyer les données de session
        }
      }
    }, []);
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
        <ShoppingCart className="w-5 h-5 text-gray-600" />
        <h3 className="text-xl font-bold text-gray-800">Mon panier</h3>
        </div>
        {items.length > 0 && (
          <button
            onClick={onClearCart}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            title="Vider le panier"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Votre panier est vide</p>
          <p className="text-sm text-gray-400 mt-2">Ajoutez des plats pour commencer</p>
        </div>
      ) : (
        <>
      <div className="space-y-4 mb-6">
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden">
              <img
                src={` ${apiBaseUrl}/uploads/${item.image}`}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <h4 className="font-medium text-gray-800 text-sm">{item.name}</h4>
              <p className="text-sm font-bold text-gray-800">
                {item.price.toFixed(2)} TND
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onUpdateQuantity(item.name, item.quantity - 1)}
                className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors active:scale-95"
              >
                <Minus className="w-3 h-3 text-gray-600" />
              </button>
              <span className="text-sm font-medium text-gray-800 w-4 text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(item.name, item.quantity + 1)}
                className="w-6 h-6 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity active:scale-95"
                style={{ backgroundColor: '#FF8C00' }}
              >
                <Plus className="w-3 h-3 text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total</span>
          <span className="font-medium">{total.toFixed(2)} TND</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Remise</span>
          <span className="font-medium text-green-600">-{discount.toFixed(2)} TND</span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span>Total à payer</span>
          <span style={{ color: '#FF8C00' }}>{final.toFixed(2)} TND</span>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={isLaunching}
        className={`w-full mt-6 py-3 rounded-xl text-white font-medium transition-all hover:opacity-90 hover:scale-105 active:scale-95 relative overflow-hidden ${
          isLaunching ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
        style={{ backgroundColor: '#32CD32' }}
      >
        Passer ma commande
      </button>
        </>
      )}
      
      <OrderModal
      isOpen={showOrderModal}
      onClose={() => setShowOrderModal(false)}
      cartItems={items}
      onConfirmOrder={handleConfirmOrder}
    />

    {orderData && (
      <Invoice
        isOpen={showInvoice}
        onClose={() => setShowInvoice(false)}
        cartItems={items}
        orderData={orderData}
        orderNumber={orderNumber}
      />
    )} 
    </div>    
  );
};

export default Cart;