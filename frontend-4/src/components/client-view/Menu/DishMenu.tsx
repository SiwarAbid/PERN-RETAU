import React from 'react';
import { Plus } from 'lucide-react';
import type { Dish } from '../../../types/dish';

interface PopularDishesProps {
  dishes: Dish[];
  onAddToCart: (dish: Dish) => void;
  selectedCategory: string;
}

const PopularDishes: React.FC<PopularDishesProps> = ({ dishes, onAddToCart, selectedCategory }) => {
  const getCategoryTitle = (category: string) => {
    console.log("getCategoryTitle: ", category)
    const titles = {
      Plats: 'Plats traditionnels',
      Salade: 'Salades fraîches',
      Boissons: 'Boissons rafraîchissantes',
      Soupe: 'Soupes chaudes',
      Dessert: 'Douceurs & Desserts',
      Sandwich: 'Sandwichs savoureux',
      Pizza: 'Pizzas délicieuses'
    };
    return titles[category as keyof typeof titles] || 'Nos plats';
  };
  const categoryRandomVideo = sessionStorage.getItem('categorieRandomVideo') ? sessionStorage.getItem('categorieRandomVideo') as string : '';
  const nomRandomVideo  = sessionStorage.getItem('nomRamdomVideo') ? sessionStorage.getItem('nomRamdomVideo') as string : '';
  
  // dish name contient nomRandomVideo

  const dishesRandomVideo = dishes.filter(dish => categoryRandomVideo === '' || (dish.category.name === categoryRandomVideo || dish.name.includes(nomRandomVideo)));
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        {dishesRandomVideo.length > 0 && selectedCategory !== '' ? getCategoryTitle(dishes[0].category.name) : 'Menu'}
      </h3>
      
      {dishesRandomVideo.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aucun plat disponible dans cette catégorie</p>
        </div>
      ) : (
      <div className="grid grid-cols-4 gap-4">
        {dishesRandomVideo.map((dish, index) => (
          <div
            key={index}
            className={`rounded-2xl p-4 transition-all hover:shadow-lg transform hover:scale-105 bg-white hover:bg-gray-50`}
            style={{ backgroundColor: '#FFFFFF' }}
          >
            <div className="w-full h-32 rounded-xl overflow-hidden mb-4">
              <img
                src={` ${apiBaseUrl}/uploads/${dish.image}`}
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
                {dish.price.toFixed(2)} TND
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