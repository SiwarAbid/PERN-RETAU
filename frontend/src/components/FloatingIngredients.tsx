import React from 'react';

interface Ingredient {
  emoji: string;
  delay: number;
  duration: number;
  startX: number;
}

interface FloatingIngredientsProps {
  isDark: boolean;
}

const FloatingIngredients: React.FC<FloatingIngredientsProps> = ({ isDark }) => {
  const ingredients: Ingredient[] = [
    { emoji: '🌿', delay: 0, duration: 20, startX: 10 },
    { emoji: '🫒', delay: 2, duration: 25, startX: 20 },
    { emoji: '🌶️', delay: 4, duration: 18, startX: 80 },
    { emoji: '🧄', delay: 6, duration: 22, startX: 70 },
    { emoji: '🧅', delay: 8, duration: 19, startX: 30 },
    { emoji: '🍃', delay: 10, duration: 24, startX: 90 },
    { emoji: '🫘', delay: 12, duration: 21, startX: 15 },
    { emoji: '🌾', delay: 14, duration: 23, startX: 60 },
    { emoji: '🍋', delay: 16, duration: 26, startX: 40 },
    { emoji: '🥕', delay: 18, duration: 20, startX: 85 },
    { emoji: '🌽', delay: 20, duration: 24, startX: 25 },
    { emoji: '🍅', delay: 22, duration: 22, startX: 75 },
  ];

  const spiceParticles: number[] = Array.from({ length: 8 }, (_, index) => index);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {ingredients.map((ingredient, index) => (
        <div
          key={`ingredient-${index}`}
          className={`absolute text-3xl transition-opacity duration-1000 ${
            isDark ? 'opacity-40 brightness-75' : 'opacity-30 brightness-100'
          }`}
          style={{
            left: `${ingredient.startX}%`,
            animation: `float-ingredient ${ingredient.duration}s linear infinite`,
            animationDelay: `${ingredient.delay}s`,
          }}
        >
          {ingredient.emoji}
        </div>
      ))}
      
      {/* Particules d'épices supplémentaires */}
      {spiceParticles.map((index) => (
        <div
          key={`spice-${index}`}
          className={`absolute w-2 h-2 rounded-full transition-opacity duration-1000 ${
            isDark 
              ? 'bg-[#f8bb4c]/20' 
              : 'bg-[#f8971b]/15'
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            animation: `float-spice ${15 + Math.random() * 10}s linear infinite`,
            animationDelay: `${Math.random() * 20}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingIngredients;