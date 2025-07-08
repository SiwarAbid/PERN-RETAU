import React from 'react';
import { Star, Award, Users, ChefHat } from 'lucide-react';

const ChefsSection = () => {
  const chefs = [
    {
      id: 1,
      name: "Chef Antoine Dubois",
      title: "Chef Exécutif",
      image: "https://images.pexels.com/photos/4253302/pexels-photo-4253302.jpeg?auto=compress&cs=tinysrgb&w=800",
      experience: "15 ans",
      specialty: "Cuisine française moderne",
      description: "Passionné par l'art culinaire depuis son plus jeune âge, Antoine a perfectionné son savoir-faire dans les plus grands restaurants parisiens.",
      awards: ["Michelin Star 2023", "Chef de l'année 2022"],
      rating: 4.9
    },
    {
      id: 2,
      name: "Chef Maria Rodriguez",
      title: "Sous-Chef",
      image: "https://images.pexels.com/photos/4253313/pexels-photo-4253313.jpeg?auto=compress&cs=tinysrgb&w=800",
      experience: "12 ans",
      specialty: "Fusion méditerranéenne",
      description: "Créative et innovante, Maria apporte une touche méditerranéenne unique à nos créations culinaires avec une expertise remarquable.",
      awards: ["Prix Innovation 2023", "Meilleur Sous-Chef 2021"],
      rating: 4.8
    },
    {
      id: 3,
      name: "Chef Yuki Tanaka",
      title: "Chef Pâtissier",
      image: "https://images.pexels.com/photos/4253320/pexels-photo-4253320.jpeg?auto=compress&cs=tinysrgb&w=800",
      experience: "10 ans",
      specialty: "Pâtisserie française & japonaise",
      description: "Maître dans l'art de la pâtisserie, Yuki combine les techniques françaises traditionnelles avec l'esthétique japonaise.",
      awards: ["Meilleur Dessert 2023", "Prix Créativité 2022"],
      rating: 4.9
    }
  ];

  return (
    <section id="chefs" className="chefs-section">
      <div className="container">
        {/* Section Header */}
        <div className="chefs-header">
          <div className="chefs-intro">
            <span className="chefs-intro-text">Rencontrez notre équipe</span>
          </div>
          <h2 className="chefs-title">
            Nos <span className="chefs-title-accent">Chefs</span> Talentueux
          </h2>
          <p className="chefs-description">
            Une équipe passionnée qui transforme chaque ingrédient en œuvre d'art culinaire
          </p>
        </div>

        {/* Chefs Grid */}
        <div className="chefs-grid">
          {chefs.map((chef, index) => (
            <div key={chef.id} className={`chef-card chef-${index + 1}`}>
              {/* Chef Image */}
              <div className="chef-image-container">
                <img src={chef.image} alt={chef.name} className="chef-image" />
                <div className="chef-overlay">
                  <div className="chef-rating">
                    <Star className="star-icon" />
                    <span>{chef.rating}</span>
                  </div>
                  <div className="chef-awards">
                    {chef.awards.map((award, idx) => (
                      <div key={idx} className="award-badge">
                        <Award className="award-icon" />
                        <span>{award}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chef Info */}
              <div className="chef-content">
                <div className="chef-header">
                  <h3 className="chef-name">{chef.name}</h3>
                  <span className="chef-title">{chef.title}</span>
                </div>

                <div className="chef-meta">
                  <div className="chef-experience">
                    <Users className="meta-icon" />
                    <span>{chef.experience} d'expérience</span>
                  </div>
                  <div className="chef-specialty">
                    <ChefHat className="meta-icon" />
                    <span>{chef.specialty}</span>
                  </div>
                </div>

                <p className="chef-description">{chef.description}</p>

                <button className="chef-contact-btn">
                  <span>Contacter le chef</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Team Stats */}
        <div className="team-stats">
          <div className="stat-card">
            <div className="stat-number">3</div>
            <div className="stat-label">Chefs Experts</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">25+</div>
            <div className="stat-label">Années d'expérience</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">5</div>
            <div className="stat-label">Prix culinaires</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-label">Passion</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChefsSection;