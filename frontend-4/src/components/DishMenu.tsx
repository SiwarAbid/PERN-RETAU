import React from 'react';
import { Plus } from 'lucide-react';
import type { Dish } from '../pages/Menu';

interface PopularDishesProps {
  dishes: Dish[];
  onAddToCart: (dish: Dish) => void;
}

const PopularDishes: React.FC<PopularDishesProps> = ({ dishes, onAddToCart }) => {
  const getCategoryTitle = (category: string) => {
    const titles = {
      salad: 'Fresh Salads',
      soup: 'Warm Soups',
      pizza: 'Delicious Pizzas',
      meat: 'Grilled Meats',
      drinks: 'Refreshing Drinks'
    };
    return titles[category as keyof typeof titles] || 'Popular Dishes';
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        {dishes.length > 0 ? getCategoryTitle(dishes[0].category) : 'Menu'}
      </h3>
      
      {dishes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aucun plat disponible dans cette catégorie</p>
        </div>
      ) : (
      <div className="grid grid-cols-4 gap-4">
        {dishes.map((dish) => (
          <div
            key={dish.id}
            className={`rounded-2xl p-4 transition-all hover:shadow-lg transform hover:scale-105 ${
              dish.isSpecial ? 'shadow-lg' : 'bg-white hover:bg-gray-50'
            }`}
            style={{
              backgroundColor: dish.isSpecial ? '#FFD700' : '#FFFFFF'
            }}
          >
            <div className="w-full h-32 rounded-xl overflow-hidden mb-4">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <h4 className="font-semibold text-gray-800 mb-2 text-sm leading-tight">
              {dish.name}
            </h4>
            <p className="text-xs text-gray-600 mb-4">{dish.description}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-800">
                ${dish.price.toFixed(2)}
              </span>
              <button
                onClick={() => onAddToCart(dish)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:opacity-80 hover:scale-110 active:scale-95"
                style={{ backgroundColor: '#FF8C00' }}
                title={`Ajouter ${dish.name} au panier`}
              >
                <Plus className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default PopularDishes;