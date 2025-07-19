import { useEffect, useState } from 'react';
import Header from '../components/Header';
import CategorySection from '../components/CategorySection';
import PopularDishes from '../components/DishMenu';
import Cart from '../components/Cart';
import DataLoadingState from '../components/Loading';
import type { Category } from '../types/user';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: Category;
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  isSpecial?: boolean;
}

    // // Salades
    // { id: '1', name: 'Fresh and Healthy Salad', description: 'Cucumber • Tomatoes • Lettuce', price: 2.85, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'salad' },
    // { id: '2', name: 'Crunchy Cashew Salad', description: 'Cashews • Lettuce • Tomatoes', price: 2.85, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'salad' },
    // { id: '3', name: 'Caesar Salad', description: 'Lettuce • Parmesan • Croutons', price: 3.25, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'salad' },
    
    // // Soupes
    // { id: '4', name: 'Chicken Rice Bowl', description: 'Chicken • Rice • Vegetables', price: 3.85, image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'soup', isSpecial: true },
    // { id: '5', name: 'Tomato Soup', description: 'Fresh tomatoes • Basil • Cream', price: 2.95, image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'soup' },
    // { id: '6', name: 'Mushroom Soup', description: 'Mixed mushrooms • Cream • Herbs', price: 3.15, image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'soup' },
    
    // // Pizzas
    // { id: '7', name: 'Margherita Pizza', description: 'Tomato • Mozzarella • Basil', price: 8.85, image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'pizza' },
    // { id: '8', name: 'Pepperoni Pizza', description: 'Pepperoni • Mozzarella • Tomato', price: 9.85, image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'pizza' },
    // { id: '9', name: 'Vegetarian Pizza', description: 'Vegetables • Mozzarella • Olives', price: 9.25, image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'pizza' },
    
    // // Viandes
    // { id: '10', name: 'Grilled Steak', description: 'Premium beef • Herbs • Sauce', price: 15.85, image: 'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'meat' },
    // { id: '11', name: 'Chicken Breast', description: 'Grilled chicken • Vegetables', price: 12.85, image: 'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'meat' },
    // { id: '12', name: 'Lamb Chops', description: 'Tender lamb • Rosemary • Garlic', price: 18.85, image: 'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'meat' },
    
    // // Boissons
    // { id: '13', name: 'Fresh Orange Juice', description: 'Freshly squeezed oranges', price: 3.50, image: 'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'drinks' },
    // { id: '14', name: 'Iced Coffee', description: 'Cold brew • Ice • Milk', price: 2.85, image: 'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'drinks' },
    // { id: '15', name: 'Smoothie Bowl', description: 'Mixed fruits • Yogurt • Granola', price: 4.25, image: 'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1', category: 'drinks' }
const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [allDishes, seAllDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect (() =>{
    const fetchDishes = async () => {
    setLoading(true);
    setError(null);
      try {
        const response = await fetch('http://localhost:5000/dishes', {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des plats');
        }
        const data = await response.json();
        console.log(data);
        seAllDishes(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Erreur inconnue lors du chargement'
        );
      } finally {
        setLoading(false);
      }
    };
    fetchDishes();
  },[])
  const filteredDishes = allDishes.filter(dish => selectedCategory === '' || dish.category.name === selectedCategory);
  console.log("Selected Category: ", selectedCategory)
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
    
    alert(`Commande confirmée !\nTotal: ${final.toFixed(2)} TND\nMerci pour votre commande !`);
    clearCart();
  };
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F5DC' }}>
      <div className=" ">
        <Header />
        <div className="flex pt-20 max-w-7xl gap-6 mt-6 mx-auto px-4">

          {/* Gestion du chargement et des erreurs */}
          {loading && <div className="text-center py-4"><DataLoadingState isLoading={loading} isEmpty={true} hasError={false}/></div>}
          {error && <div className="text-center py-4 text-red-500"><DataLoadingState isLoading={loading} isEmpty={false} hasError={true} errorMessage={error}/></div>}
          
          {/* Category Section */}
          {!loading && !error && 
          <div className="flex-1"> 
            <CategorySection 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              totalFood={allDishes.length}
            />
            <PopularDishes 
              dishes={filteredDishes}
              onAddToCart={addToCart} 
              selectedCategory={selectedCategory}
            />
          </div>
          }
          {!loading && !error && 
          <div className="w-80">
            <Cart 
              items={cartItems} 
              onUpdateQuantity={updateQuantity}
              onCheckout={handleCheckout}
              onClearCart={clearCart}
            />
          </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;