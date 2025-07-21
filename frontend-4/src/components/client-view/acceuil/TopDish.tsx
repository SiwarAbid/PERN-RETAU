import { Star, Heart, Award, TrendingUp, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { TopDish } from '../../../types/dish'
import { useCart } from '../../../hooks/useCart';


const TopDishes = () => {
  const dishes = localStorage.getItem('dishes') ? (JSON.parse(localStorage.getItem('dishes') as string) ) : [];
  // console.log("dishes :", dishes)
  // 1. Trier les plats par rating décroissant
const sortedByRating = [...dishes].sort((a, b) => b.rating - a.rating);

// 2. Extraire les deux meilleurs plats (sans doublon par ID)
const topRatedDishes = sortedByRating.slice(0, 3);
// console.log("topRatedDishes :", topRatedDishes)

// 3. Trouver le dernier plat ajouté
const sortedByDate = [...dishes].sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);
const dernierPlatAjoute = sortedByDate[0];
// console.log("dernierPlatAjoute :", dernierPlatAjoute)

// 4. Construire topDishes sans redondance (ex: par id)
const topDishes : TopDish[] = [];
for (let i = 0; i < topRatedDishes.length; i++) {
  topDishes.push({
    badge: `Populaire ${i+1}`,
    ...topRatedDishes[i] 
  });
}

let top3Dishes : TopDish[] = []
// console.log("Condition : ", topDishes.find(d => d.name === dernierPlatAjoute.name))
if (!topDishes.find(d => d.name === dernierPlatAjoute.name)) {
  // console.log("Condition : true")
  top3Dishes = topDishes.slice(0, 2)
  top3Dishes.push({
    badge: `Nouveauté`,
    ...dernierPlatAjoute
  });
}

// console.log("Top 3 Plats : ", top3Dishes)
// Limiter à 3 plats max
const finalTopDishes = top3Dishes.slice(0, 3);

// console.log("finalTopDishes :", finalTopDishes);
  const [isShow, setIsShow] = useState(false);

const AddToCartAlert = () => {
  useEffect(() => {
    console.log("Is show ;", isShow)
    if (isShow) {
      const timer = setTimeout(() => {
        setIsShow(false);
      }, 2000); // 2 secondes
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div
      className={`fixed top-5 right-5 flex items-center gap-2 p-3 rounded-xl text-white shadow-md transition-opacity duration-500 ${
        isShow ? "opacity-100 bg-green-600" : "opacity-0 pointer-events-none"
      }`}
    >
      <CheckCircle className="w-5 h-5" />
      <span>Produit ajouté au panier</span>
    </div>
  );
};
  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case "Populaire 1":
        return <TrendingUp className="badge-icon" />;
      case "Populaire 2":
        return <Award className="badge-icon" />;
      case "Nouveauté":
        return <Heart className="badge-icon" />;
      default:
        return <Star className="badge-icon" />;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Populaire 1":
        return "badge-popular";
      case "Populaire 2":
        return "badge-chef";
      case "Nouveauté":
        return "badge-trending";
      default:
        return "badge-default";
    }
  };

const { addToCart } = useCart();
    // throw new Error('Function not implemented.');

  return (
    <section id="top-dishes" className="top-dishes-section">
      <div className="container">
        {/* Section Header */}
        <div className="top-dishes-header">
          <div className="top-dishes-intro">
            <span className="top-dishes-intro-text">Nos créations les plus appréciées</span>
          </div>
          <h2 className="top-dishes-title">
            Top {topDishes.length} <span className="top-dishes-title-accent">Plats</span> Signature
          </h2>
          <p className="top-dishes-description">
            Découvrez les plats qui ont conquis le cœur de nos clients et qui font la réputation de Sweet Corner
          </p>
        </div>

        {/* Top Dishes Grid */}
        <div className="top-dishes-grid">
          {finalTopDishes.map((dish, index) => (
            <div key={index} className={`top-dish-card rank-${index + 1}`}>
              {/* Rank Number */}
              <div className="rank-number">
                <span>{index + 1}</span>
              </div>

              {/* Badge */}
              <div className={`dish-badge ${getBadgeColor(dish.badge)}`}>
                {getBadgeIcon(dish.badge)}
                <span>{dish.badge.split(' ')[0]}</span>
              </div>

              {/* Image Container */}
              <div className="dish-image-1-container">
                <img src={`http://localhost:5000/uploads/${dish.image}`} alt={dish.name} className="dish-image" />
              </div>

              {/* Content */}
              <div className="dish-content">
                <h3 className="dish-title">{dish.name}</h3>
                
                <div className="dish-meta">
                  <div className="dish-rating">
                    <Star className="star-icon" />
                    <span className="rating-value">{dish.rating}</span>
                    {/* <span className="reviews-count">10 avis</span> */}
                  </div>
                </div>

                <p className="dish-description">{dish.description}</p>

                <div className="dish-footer">
                  <div className="dish-price">{dish.price} TND</div>
                  <button className="order-btn" onClick={() => addToCart(dish)}>
                    <span>Commander</span>
                  </button>
                  {isShow ? <AddToCartAlert /> : null}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="top-dishes-cta">
          <p className="cta-text">Envie de découvrir tous nos plats ?</p>
          <button className="cta-button" onClick={() => { window.location.href = '/menu' }}>
            <span>Voir le menu complet</span>
          </button>
          
        </div>
      </div>
    </section>
  );
};

export default TopDishes;