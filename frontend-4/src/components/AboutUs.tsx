import React from 'react';
import { Heart, Clock, Award, Utensils, Leaf, Globe } from 'lucide-react';

const AboutSection = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion",
      description: "Chaque plat est préparé avec amour et dévouement"
    },
    {
      icon: Leaf,
      title: "Fraîcheur",
      description: "Ingrédients locaux et de saison sélectionnés quotidiennement"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Un service irréprochable et une qualité constante"
    },
    {
      icon: Globe,
      title: "Innovation",
      description: "Fusion créative des saveurs du monde entier"
    }
  ];

  const timeline = [
    {
      year: "2010",
      title: "Les Débuts",
      description: "Ouverture de notre premier restaurant avec une vision simple : offrir une cuisine authentique et savoureuse."
    },
    {
      year: "2015",
      title: "Reconnaissance",
      description: "Première étoile Michelin et reconnaissance de la critique gastronomique française."
    },
    {
      year: "2020",
      title: "Expansion",
      description: "Agrandissement de nos locaux et création d'une terrasse panoramique unique."
    },
    {
      year: "2024",
      title: "Innovation",
      description: "Lancement de notre concept Sweet Corner avec une approche moderne de la gastronomie."
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        {/* Section Header */}
        <div className="about-header">
          <div className="about-intro">
            <span className="about-intro-text">Notre histoire</span>
          </div>
          <h2 className="about-title">
            À <span className="about-title-accent">Propos</span> de Sweet Corner
          </h2>
          <p className="about-description">
            Une aventure culinaire qui a commencé par une passion et qui continue d'évoluer chaque jour
          </p>
        </div>

        {/* Main Content */}
        <div className="about-content">
          {/* Story Section */}
          <div className="about-story">
            <div className="story-text">
              <h3 className="story-title">Notre Vision</h3>
              <p className="story-paragraph">
                Sweet Corner est né d'une vision simple mais ambitieuse : créer un lieu où la gastronomie 
                rencontre l'art, où chaque repas devient une expérience mémorable. Depuis notre ouverture, 
                nous nous efforçons de repousser les limites de la créativité culinaire.
              </p>
              <p className="story-paragraph">
                Notre équipe de chefs passionnés travaille sans relâche pour vous offrir des saveurs 
                authentiques, des présentations artistiques et un service d'exception. Chaque ingrédient 
                est soigneusement sélectionné, chaque plat minutieusement préparé.
              </p>
              
              <div className="story-stats">
                <div className="story-stat">
                  <Utensils className="stat-icon" />
                  <div>
                    <div className="stat-number">500+</div>
                    <div className="stat-text">Plats créés</div>
                  </div>
                </div>
                <div className="story-stat">
                  <Clock className="stat-icon" />
                  <div>
                    <div className="stat-number">14</div>
                    <div className="stat-text">Années d'excellence</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="story-image">
              <img 
                src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Notre restaurant" 
                className="story-img"
              />
              <div className="image-decoration"></div>
            </div>
          </div>

          {/* Values Section */}
          <div className="values-section">
            <h3 className="values-title">Nos Valeurs</h3>
            <div className="values-grid">
              {values.map((value, index) => (
                <div key={index} className={`value-card value-${index + 1}`}>
                  <div className="value-icon">
                    <value.icon className="icon-lg" />
                  </div>
                  <h4 className="value-title">{value.title}</h4>
                  <p className="value-description">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Section */}
          <div className="timeline-section">
            <h3 className="timeline-title">Notre Parcours</h3>
            <div className="timeline">
              {timeline.map((item, index) => (
                <div key={index} className={`timeline-item timeline-${index + 1}`}>
                  <div className="timeline-marker">
                    <div className="timeline-dot"></div>
                    <div className="timeline-year">{item.year}</div>
                  </div>
                  <div className="timeline-content">
                    <h4 className="timeline-item-title">{item.title}</h4>
                    <p className="timeline-description">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;