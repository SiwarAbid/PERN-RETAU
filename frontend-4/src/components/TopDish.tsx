import React from 'react';
import { Star, Clock, Heart, Award, TrendingUp } from 'lucide-react';

interface TopDish {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  rating: number;
  reviews: number;
  prepTime: string;
  badge: string;
  popularity: number;
}

const TopDishes = () => {
  const topDishes: TopDish[] = [
    {
      id: 1,
      name: "Saumon Grillé Teriyaki",
      description: "Notre plat signature ! Filet de saumon grillé avec sauce teriyaki maison, riz jasmin parfumé et légumes croquants. Une fusion parfaite entre tradition japonaise et modernité.",
      image: "https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "38€",
      rating: 4.9,
      reviews: 247,
      prepTime: "20 min",
      badge: "Le Plus Populaire",
      popularity: 95
    },
    {
      id: 2,
      name: "Risotto aux Champignons Sauvages",
      description: "Risotto crémeux aux champignons sauvages de saison, parmesan affiné 24 mois et truffe noire. Un classique italien revisité avec élégance par notre chef.",
      image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "32€",
      rating: 4.8,
      reviews: 189,
      prepTime: "25 min",
      badge: "Choix du Chef",
      popularity: 88
    },
    {
      id: 3,
      name: "Burger Gourmet Wagyu",
      description: "Burger artisanal avec steak de bœuf Wagyu, fromage affiné, légumes frais du marché et nos frites maison croustillantes. L'excellence à l'américaine.",
      image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "42€",
      rating: 4.7,
      reviews: 156,
      prepTime: "18 min",
      badge: "Tendance",
      popularity: 82
    }
  ];

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case "Le Plus Populaire":
        return <TrendingUp className="badge-icon" />;
      case "Choix du Chef":
        return <Award className="badge-icon" />;
      case "Tendance":
        return <Heart className="badge-icon" />;
      default:
        return <Star className="badge-icon" />;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Le Plus Populaire":
        return "badge-popular";
      case "Choix du Chef":
        return "badge-chef";
      case "Tendance":
        return "badge-trending";
      default:
        return "badge-default";
    }
  };

  return (
    <section id="top-dishes" className="top-dishes-section">
      <div className="container">
        {/* Section Header */}
        <div className="top-dishes-header">
          <div className="top-dishes-intro">
            <span className="top-dishes-intro-text">Nos créations les plus appréciées</span>
          </div>
          <h2 className="top-dishes-title">
            Top 3 <span className="top-dishes-title-accent">Plats</span> Signature
          </h2>
          <p className="top-dishes-description">
            Découvrez les plats qui ont conquis le cœur de nos clients et qui font la réputation de Sweet Corner
          </p>
        </div>

        {/* Top Dishes Grid */}
        <div className="top-dishes-grid">
          {topDishes.map((dish, index) => (
            <div key={dish.id} className={`top-dish-card rank-${index + 1}`}>
              {/* Rank Number */}
              <div className="rank-number">
                <span>{index + 1}</span>
              </div>

              {/* Badge */}
              <div className={`dish-badge ${getBadgeColor(dish.badge)}`}>
                {getBadgeIcon(dish.badge)}
                <span>{dish.badge}</span>
              </div>

              {/* Image Container */}
              <div className="dish-image-1-container">
                <img src={dish.image} alt={dish.name} className="dish-image" />
                <div className="image-overlay">
                  <div className="popularity-bar">
                    <div className="popularity-fill" style={{ width: `${dish.popularity}%` }}></div>
                  </div>
                  <span className="popularity-text">{dish.popularity}% de satisfaction</span>
                </div>
              </div>

              {/* Content */}
              <div className="dish-content">
                <h3 className="dish-title">{dish.name}</h3>
                
                <div className="dish-meta">
                  <div className="dish-rating">
                    <Star className="star-icon" />
                    <span className="rating-value">{dish.rating}</span>
                    <span className="reviews-count">({dish.reviews} avis)</span>
                  </div>
                  <div className="dish-time">
                    <Clock className="clock-icon" />
                    <span>{dish.prepTime}</span>
                  </div>
                </div>

                <p className="dish-description">{dish.description}</p>

                <div className="dish-footer">
                  <div className="dish-price">{dish.price}</div>
                  <button className="order-btn">
                    <span>Commander</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="top-dishes-cta">
          <p className="cta-text">Envie de découvrir tous nos plats ?</p>
          <button className="cta-button">
            <span>Voir le menu complet</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopDishes;