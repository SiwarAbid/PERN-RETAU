import { Clock, Utensils } from 'lucide-react';
import type { Dish } from '../../../types/dish';
import type { Restau } from '../../../types/accueil';

const AboutSection = () => {

  const dishes : Dish[] = localStorage.getItem('dishes') ? JSON.parse(localStorage.getItem('dishes') as string) : [];
  const restau : Restau = localStorage.getItem('restaurant') ? JSON.parse(localStorage.getItem('restaurant') as string) : {};
  const AnneeXcellence = new Date().getFullYear() - new Date(restau.createdAt).getFullYear();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  return (
    <section id="about" className="about-section">
      <div className="container">
        {/* Section Header */}
        <div className="about-header">
          <div className="about-intro">
            <span className="about-intro-text">Notre histoire</span>
          </div>
          <h2 className="about-title">
            À <span className="about-title-accent">Propos</span> de {restau.name}
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
              {/* La deuxiéme pargraphe d'aprés Notre équipe */}
              <p className="story-paragraph" style={{ whiteSpace: 'pre-line' }}>
                {restau.aboutUs}
              </p>
              
              <div className="story-stats">
                <div className="story-stat">
                  <Utensils className="stat-icon" />
                  <div>
                    <div className="stat-number">{dishes.length}</div>
                    <div className="stat-text">Plats créés</div>
                  </div>
                </div>
                <div className="story-stat">
                  <Clock className="stat-icon" />
                  <div>
                    <div className="stat-number">{AnneeXcellence}</div>
                    <div className="stat-text">Années d'excellence</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="story-image">
              <img 
                src={
                  (restau && restau.image)
                  ? `htttps://${apiBaseUrl}/uploads/${restau.image}`
                  : "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800"} 
                alt="Notre restaurant" 
                className="story-img"
              />
              <div className="image-decoration"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;