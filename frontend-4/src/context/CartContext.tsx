import React, { useState } from 'react';
import { CartContext } from '../hooks/useCart';
import type { Dish } from '../types/dish';
import type { CartItem } from '../types/cart';
export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (dish: Dish) => void;
  updateQuantity: (name: string, quantity: number) => void;
  removeFromCart: (dishName: string) => void;
  clearCart: () => void;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  const addToCart = (dish: Dish) => {
    setCartItems(prev => {
      const found = prev.find(item => item.name === dish.name);
      const updated = found
        ? prev.map(item =>
            item.name === dish.name ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prev, { ...dish, quantity: 1 }];
      localStorage.setItem("cartItems", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (dishName: string) => {
    const updated = cartItems.filter(item => item.name !== dishName);
    setCartItems(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const updateQuantity = (name: string, quantity: number) => {
    if (quantity === 0) 
      removeFromCart(name);
    else {
      const updated = cartItems.map(item =>
        item.name === name ? { ...item, quantity } : item
      );
      setCartItems(updated);
      localStorage.setItem("cartItems", JSON.stringify(updated));
    }

  };
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart , updateQuantity}}>
      {children}
    </CartContext.Provider>
  );
};
