import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Clock } from 'lucide-react';

interface Dish {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  category: string;
  rating: number;
  prepTime: string;
}

const MenuSection = () => {
  const [currentDish, setCurrentDish] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  const dishes: Dish[] = [
    {
      id: 1,
      name: "Saumon Grillé aux Herbes",
      description: "Filet de saumon frais grillé à la perfection, accompagné d'une sauce aux herbes fraîches et de légumes de saison. Un plat léger et savoureux qui ravira vos papilles.",
      image: "https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "28€",
      category: "Poissons",
      rating: 4.8,
      prepTime: "20 min"
    },
    {
      id: 2,
      name: "Risotto aux Champignons",
      description: "Risotto crémeux préparé avec des champignons sauvages, du parmesan affiné et des herbes aromatiques. Une explosion de saveurs dans chaque bouchée.",
      image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "24€",
      category: "Végétarien",
      rating: 4.9,
      prepTime: "25 min"
    },
    {
      id: 3,
      name: "Côte de Bœuf Grillée",
      description: "Côte de bœuf maturée, grillée au feu de bois et servie avec une sauce au poivre vert. Accompagnée de pommes de terre rôties et de légumes grillés.",
      image: "https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "35€",
      category: "Viandes",
      rating: 4.7,
      prepTime: "30 min"
    },
    {
      id: 4,
      name: "Tarte Tatin Maison",
      description: "Notre célèbre tarte tatin aux pommes caramélisées, servie tiède avec une boule de glace vanille artisanale. Un dessert traditionnel revisité.",
      image: "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "12€",
      category: "Desserts",
      rating: 4.9,
      prepTime: "15 min"
    },
    {
      id: 5,
      name: "Bouillabaisse Provençale",
      description: "Soupe de poissons traditionnelle de Marseille avec rouille, croûtons et fromage râpé. Préparée selon la recette authentique avec les meilleurs poissons de la Méditerranée.",
      image: "https://images.pexels.com/photos/5409751/pexels-photo-5409751.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "32€",
      category: "Spécialités",
      rating: 4.8,
      prepTime: "35 min"
    },
    {
      id: 6,
      name: "Salade de Quinoa Colorée",
      description: "Salade fraîche de quinoa avec avocat, tomates cerises, concombre, feta et vinaigrette à l'huile d'olive. Un plat sain et équilibré, parfait pour les amateurs de cuisine healthy.",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "18€",
      category: "Salades",
      rating: 4.6,
      prepTime: "10 min"
    }
  ];

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate) return;
    
    const interval = setInterval(() => {
      setIsRotating(true);
      setTimeout(() => {
        setCurrentDish((prev) => (prev + 1) % dishes.length);
        setIsRotating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoRotate, dishes.length]);

  const nextDish = () => {
    setAutoRotate(false);
    setIsRotating(true);
    setTimeout(() => {
      setCurrentDish((prev) => (prev + 1) % dishes.length);
      setIsRotating(false);
    }, 300);
  };

  const prevDish = () => {
    setAutoRotate(false);
    setIsRotating(true);
    setTimeout(() => {
      setCurrentDish((prev) => (prev - 1 + dishes.length) % dishes.length);
      setIsRotating(false);
    }, 300);
  };

  const goToDish = (index: number) => {
    if (index === currentDish) return;
    setAutoRotate(false);
    setIsRotating(true);
    setTimeout(() => {
      setCurrentDish(index);
      setIsRotating(false);
    }, 300);
  };

  const currentDishData = dishes[currentDish];

  return (
    <section id="menu" className="menu-section">
      <div className="container">
        {/* Section Header */}
        <div className="menu-header">
          <div className="menu-intro">
            <span className="menu-intro-text">Découvrez nos créations</span>
          </div>
          <h2 className="menu-title">
            Notre <span className="menu-title-accent">Menu</span> Signature
          </h2>
          <p className="menu-description">
            Chaque plat raconte une histoire unique, préparé avec passion par nos chefs
          </p>
        </div>

        {/* Main Content */}
        <div className="menu-content">
          {/* Left Side - Dish Info */}
          <div className="dish-info">
            <div className="dish-category">{currentDishData.category}</div>
            
            <h3 className="dish-name">{currentDishData.name}</h3>
            
            <div className="dish-meta">
              <div className="dish-rating">
                <Star className="star-icon" />
                <span>{currentDishData.rating}</span>
              </div>
              <div className="dish-time">
                <Clock className="clock-icon" />
                <span>{currentDishData.prepTime}</span>
              </div>
              <div className="dish-price">{currentDishData.price}</div>
            </div>
            
            <p className="dish-description">{currentDishData.description}</p>
            
            <button className="order-btn">
              Commander ce plat
            </button>
          </div>

          {/* Center - Rotating Circle */}
          <div className="rotating-circle-container">
            <div className="circle-background"></div>
            <div className="circle-decorations">
              <div className="decoration-ring ring-1"></div>
              <div className="decoration-ring ring-2"></div>
              <div className="decoration-ring ring-3"></div>
            </div>
            
            <div className={`dish-circle ${isRotating ? 'rotating' : ''}`}>
              <div className="dish-image-container">
                <img 
                  src={currentDishData.image} 
                  alt={currentDishData.name}
                  className="dish-image"
                />
                <div className="image-border"></div>
              </div>
            </div>

            {/* Navigation Controls */}
            <button className="nav-btn nav-btn-left" onClick={prevDish}>
              <ChevronLeft className="nav-icon" />
            </button>
            <button className="nav-btn nav-btn-right" onClick={nextDish}>
              <ChevronRight className="nav-icon" />
            </button>
          </div>

          {/* Right Side - Dish Indicators */}
          <div className="dish-indicators">
            <div className="indicators-title">Nos Spécialités</div>
            <div className="indicators-list">
              {dishes.map((dish, index) => (
                <button
                  key={dish.id}
                  className={`indicator ${index === currentDish ? 'active' : ''}`}
                  onClick={() => goToDish(index)}
                >
                  <div className="indicator-image">
                    <img src={dish.image} alt={dish.name} />
                  </div>
                  <div className="indicator-info">
                    <span className="indicator-name">{dish.name}</span>
                    <span className="indicator-price">{dish.price}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="progress-dots">
          {dishes.map((_, index) => (
            <button
              key={index}
              className={`progress-dot ${index === currentDish ? 'active' : ''}`}
              onClick={() => goToDish(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;