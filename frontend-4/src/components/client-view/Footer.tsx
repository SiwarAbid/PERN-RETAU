import { Facebook, Instagram, Twitter, ChefHat, Mail, Phone, MapPin } from 'lucide-react';
import type { Restau } from '../../types/accueil';

const Footer = () => {
  const restau: Restau = localStorage.getItem('restaurant') ? JSON.parse(localStorage.getItem('restaurant') as string) : {};

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-grid">
            {/* Logo and description */}
            <div className="footer-brand">
              <div className="footer-logo">
                <ChefHat className="icon-lg icon-primary" />
                <span className="footer-logo-text">
                  SWEET<span className="logo-accent">Corner</span>
                </span>
              </div>
              <p className="footer-description">
                Une expérience culinaire authentique où chaque plat raconte une histoire unique.
              </p>
              <div className="footer-social">
                <a
                  href="http://www.facebook.com/sweetcorner"
                  className="footer-social-link"
                  aria-label="Facebook"
                >
                  <Facebook className="icon" />
                </a>
                <a
                  href="http://www.instagram.com/sweetcorner"
                  className="footer-social-link"
                  aria-label="Instagram"
                >
                  <Instagram className="icon" />
                </a>
                <a
                  href="http://www.twitter.com/sweetcorner"
                  className="footer-social-link"
                  aria-label="Twitter"
                >
                  <Twitter className="icon" />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="footer-section-title">Navigation</h3>
              <ul className="footer-links">
                <li>
                  <a href="#accueil" className="footer-link">
                    Accueil
                  </a>
                </li>
                <li>
                  <a href="http://localhost:5173/menu" className="footer-link">
                    Menu
                  </a>
                </li>
                <li>
                  <a href="#chefs" className="footer-link">
                    Nos Chefs
                  </a>
                </li>
                <li>
                  <a href="#about" className="footer-link">
                    À propos
                  </a>
                </li>
                <li>
                  <a href="#contact" className="footer-link">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="footer-section-title">Contact</h3>
              <div className="footer-contact-info">
                <div className="footer-contact-item">
                  <MapPin className="icon" />
                  <span>{restau ? restau.address : "123 Rue de la Liberté 1000 Tunis, Tunisie"}</span>
                </div>
                <div className="footer-contact-item">
                  <Phone className="icon" />
                  <span>{restau ? restau.phone : '+216 99 888 777'}</span>
                </div>
                <div className="footer-contact-item">
                  <Mail className="icon" />
                  <span>{restau ? restau.email : "contact@sweetcorner.tn"}</span>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div>
              <h3 className="footer-section-title">Horaires</h3>
              <div className="footer-hours">
                <div>
                  <span style={{ fontWeight: 500 }}>Lun - Jeu:</span>
                  <span style={{ marginLeft: '0.5rem' }}>7:30 - 23:00</span>
                </div>
                <div>
                  <span style={{ fontWeight: 500 }}>Sam - Dim:</span>
                  <span style={{ marginLeft: '0.5rem' }}>7:00 - 00:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="footer-bottom">
            <p className="footer-copyright">
              © 2024 Sweet Corner. Tous droits réservés.
            </p>
            <div className="footer-legal">
              <p className="footer-legal-link">
                Mentions légales
              </p>
              <p className="footer-legal-link">
                Politique de confidentialité
              </p>
              <p className="footer-legal-link">
                CGU
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;