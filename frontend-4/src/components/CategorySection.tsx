import React from 'react';

interface Category {
  id: string;
  name: string;
  image: string;
  key: string;
}

interface CategorySectionProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ selectedCategory, onCategoryChange }) => {
  const categories: Category[] = [
    {
      id: '1',
      name: 'Salad',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      key: 'salad'
    },
    {
      id: '2',
      name: 'Soup',
      image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      key: 'soup'
    },
    {
      id: '3',
      name: 'Pizza',
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      key: 'pizza'
    },
    {
      id: '4',
      name: 'Steak Meat',
      image: 'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      key: 'meat'
    },
    {
      id: '5',
      name: 'Drinks',
      image: 'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      key: 'drinks'
    }
  ];

  const totalDishes = {
    salad: 3,
    soup: 3,
    pizza: 3,
    meat: 3,
    drinks: 3
  };

  const totalFood = Object.values(totalDishes).reduce((sum, count) => sum + count, 0);
  const totalCategories = categories.length;

  return (
    <div className="mb-8">
      <div 
        className="rounded-2xl p-6 mb-6 text-white relative overflow-hidden"
        style={{ backgroundColor: '#FF8C00' }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Bell fresh</h2>
            <p className="text-orange-100">Fresh & healthy food every day</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{totalFood}</div>
            <div className="text-sm text-orange-100">Total food</div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{totalCategories.toString().padStart(2, '0')}</div>
            <div className="text-sm text-orange-100">Categories</div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{totalDishes[selectedCategory as keyof typeof totalDishes] || 0}</div>
            <div className="text-sm text-orange-100">In category</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => onCategoryChange(category.key)}
            className={`p-4 rounded-2xl cursor-pointer transition-all hover:shadow-lg transform hover:scale-105 ${
              selectedCategory === category.key
                ? 'shadow-lg'
                : 'bg-white hover:bg-gray-50'
            }`}
            style={{
              backgroundColor: selectedCategory === category.key ? '#FFD700' : '#FFFFFF'
            }}
          >
            <div className="w-16 h-16 rounded-xl overflow-hidden mx-auto mb-3">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm font-medium text-center text-gray-800">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;