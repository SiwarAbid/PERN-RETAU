import React, { useEffect, useState } from 'react';

interface Category {
  id: number;
  name: string;
  imaage: string;
  key: string;
}

interface CategorySectionProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  totalFood: number;
}

const CategorySection: React.FC<CategorySectionProps> = ({ selectedCategory, onCategoryChange, totalFood }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(()=>{
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/categories', {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des catégories');
        }
        const data = await response.json();
        console.log(data);
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  },[])

  const totalCategories = categories.length;

  return (
    <div className="mb-8">
      <div 
        className="rounded-2xl p-6 mb-6 text-white relative overflow-hidden"
        style={{ backgroundColor: '#FF8C00' }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">SWEET CORNER</h2>
            <p className="text-orange-100">Chaque plat raconte une histoire unique</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{totalFood}</div>
            <div className="text-sm text-orange-100">Total food</div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{totalCategories.toString().padStart(2, '0')}</div>
            <div className="text-sm text-orange-100">Categories</div>
          </div>
        </div>
      </div>

      {/* Conteneur avec scroll horizontal pour plus de 5 catégories */}
      <div className="relative">
        <div className={`
          ${categories.length <= 5 
            ? 'grid grid-cols-5 gap-4' 
            : 'flex gap-4 overflow-x-auto pb-2 scrollbar-hide'
          }
        `}>
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => onCategoryChange(selectedCategory === category.name ? '' : category.name)}
            className={`
              ${categories.length > 5 ? 'flex-shrink-0 w-28' : ''} 
              p-4 rounded-2xl cursor-pointer transition-all hover:shadow-lg transform hover:scale-105 ${
              selectedCategory === category.name
                ? 'shadow-lg'
                : 'bg-white hover:bg-gray-50'
            }`}
            style={{
              backgroundColor: selectedCategory === category.name ? '#FFD700' : '#FFFFFF'
            }}
          >
            <div className={`
              ${categories.length > 5 ? 'w-12 h-12' : 'w-16 h-16'} 
              rounded-xl overflow-hidden mx-auto mb-3
            `}>
              <img
                src={`http://localhost:5000/uploads/${category.imaage}`}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className={`
              ${categories.length > 5 ? 'text-xs' : 'text-sm'} 
              font-medium text-center text-gray-800 leading-tight
            `}>
              {category.name}
            </p>
          </div>
        ))}
        </div>
        
        {/* Indicateur de scroll si plus de 5 catégories */}
        {categories.length > 5 && (
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-l from-gray-100 to-transparent w-8 h-full pointer-events-none items-center justify-end pr-2 hidden">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySection;