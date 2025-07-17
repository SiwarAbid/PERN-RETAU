import { useState } from 'react';
import Header from '../components/Header';
import CategorySection from '../components/CategorySection';
import PopularDishes from '../components/DishMenu';
import Cart from '../components/Cart';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isSpecial?: boolean;
}
function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('soup');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: '1', name: 'Crunchy Cashew...', price: 12.85, quantity: 1, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1', category: 'salad' },
    { id: '2', name: 'Cake', price: 4.85, quantity: 1, image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1', category: 'dessert' },
    { id: '3', name: 'Steak meat', price: 15.85, quantity: 1, image: 'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1', category: 'meat' },
    { id: '4', name: 'Pizza', price: 8.85, quantity: 1, image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1', category: 'pizza' }
  ]);

  const allDishes: Dish[] = [
    // Salades
    { id: '1', name: 'Fresh and Healthy Salad', description: 'Cucumber • Tomatoes • Lettuce', price: 2.85, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'salad' },
    { id: '2', name: 'Crunchy Cashew Salad', description: 'Cashews • Lettuce • Tomatoes', price: 2.85, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'salad' },
    { id: '3', name: 'Caesar Salad', description: 'Lettuce • Parmesan • Croutons', price: 3.25, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'salad' },
    
    // Soupes
    { id: '4', name: 'Chicken Rice Bowl', description: 'Chicken • Rice • Vegetables', price: 3.85, image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'soup', isSpecial: true },
    { id: '5', name: 'Tomato Soup', description: 'Fresh tomatoes • Basil • Cream', price: 2.95, image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'soup' },
    { id: '6', name: 'Mushroom Soup', description: 'Mixed mushrooms • Cream • Herbs', price: 3.15, image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'soup' },
    
    // Pizzas
    { id: '7', name: 'Margherita Pizza', description: 'Tomato • Mozzarella • Basil', price: 8.85, image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'pizza' },
    { id: '8', name: 'Pepperoni Pizza', description: 'Pepperoni • Mozzarella • Tomato', price: 9.85, image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'pizza' },
    { id: '9', name: 'Vegetarian Pizza', description: 'Vegetables • Mozzarella • Olives', price: 9.25, image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'pizza' },
    
    // Viandes
    { id: '10', name: 'Grilled Steak', description: 'Premium beef • Herbs • Sauce', price: 15.85, image: 'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'meat' },
    { id: '11', name: 'Chicken Breast', description: 'Grilled chicken • Vegetables', price: 12.85, image: 'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'meat' },
    { id: '12', name: 'Lamb Chops', description: 'Tender lamb • Rosemary • Garlic', price: 18.85, image: 'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'meat' },
    
    // Boissons
    { id: '13', name: 'Fresh Orange Juice', description: 'Freshly squeezed oranges', price: 3.50, image: 'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'drinks' },
    { id: '14', name: 'Iced Coffee', description: 'Cold brew • Ice • Milk', price: 2.85, image: 'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'drinks' },
    { id: '15', name: 'Smoothie Bowl', description: 'Mixed fruits • Yogurt • Granola', price: 4.25, image: 'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'drinks' }
  ];

  const filteredDishes = allDishes.filter(dish => dish.category === selectedCategory);

  const addToCart = (dish: Dish) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === dish.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === dish.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...dish, quantity: 1, category: dish.category }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev => 
        prev.map(item => 
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Votre panier est vide !');
      return;
    }
    
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = total * 0.1;
    const final = total - discount;
    
    alert(`Commande confirmée !\nTotal: $${final.toFixed(2)}\nMerci pour votre commande !`);
    clearCart();
  };
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F5DC' }}>
      <div className="max-w-7xl mx-auto px-4">
        <Header />
        <div className="flex min-h-screen gap-6 mt-6 h-5">
          <div className="flex-1">
            <CategorySection 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            <PopularDishes 
              dishes={filteredDishes}
              onAddToCart={addToCart} 
            />
          </div>
          
          <div className="w-80">
            <Cart 
              items={cartItems} 
              onUpdateQuantity={updateQuantity}
              onCheckout={handleCheckout}
              onClearCart={clearCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;