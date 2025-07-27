import { useEffect, useState } from 'react';
import type { User } from '../../../types/user';

const ChefsSection = () => {
  const [chefs, setChefs] = useState<User[]>([]);
  const desccription : string[] = [
    "Passionné par l'art culinaire depuis son plus jeune âge, Antoine a perfectionné son savoir-faire dans les plus grands restaurants parisiens.",
    "Maître dans l'art de la pâtisserie, Yuki combine les techniques françaises traditionnelles avec l'esthétique japonaise.",
    "Créative et innovante, Maria apporte une touche méditerranéenne unique à nos créations culinaires avec une expertise remarquable."
  ]
  const images : string[] = [
    "https://images.pexels.com/photos/4253302/pexels-photo-4253302.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/4253313/pexels-photo-4253313.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/4253320/pexels-photo-4253320.jpeg?auto=compress&cs=tinysrgb&w=800"
  ]
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  
  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const response = await fetch(` ${apiBaseUrl}/users?role=CHEF`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des chefs');
        }
        const data = await response.json();
        setChefs(data);
        // setChefs(data.filter((chef: User) => chef.isFeaturedChef === true));
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchChefs();
  }, []);

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
                <img src={
                  chef.image 
                  ? ` ${apiBaseUrl}/uploads/${chef.image}`
                  : images[index]
                  }
                  alt={chef.name} className="chef-image" 
                />
              </div>

              {/* Chef Info */}
              <div className="chef-content">
                <div className="chef-header">
                  <h3 className="chef-name">{chef.name}</h3>
                </div>

                <p className="chef-description">{chef.description ? chef.description : desccription[index]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChefsSection;