import { Facebook, Instagram, Twitter, ChefHat, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
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
                  href="#"
                  className="footer-social-link"
                  aria-label="Facebook"
                >
                  <Facebook className="icon" />
                </a>
                <a
                  href="#"
                  className="footer-social-link"
                  aria-label="Instagram"
                >
                  <Instagram className="icon" />
                </a>
                <a
                  href="#"
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
                  <a href="#menu" className="footer-link">
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
                  <span>123 Rue de la Gastronomie, Paris</span>
                </div>
                <div className="footer-contact-item">
                  <Phone className="icon" />
                  <span>+33 1 23 45 67 89</span>
                </div>
                <div className="footer-contact-item">
                  <Mail className="icon" />
                  <span>contact@sweetcorner.fr</span>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div>
              <h3 className="footer-section-title">Horaires</h3>
              <div className="footer-hours">
                <div>
                  <span style={{ fontWeight: 500 }}>Lun - Ven:</span>
                  <span style={{ marginLeft: '0.5rem' }}>11:30 - 23:00</span>
                </div>
                <div>
                  <span style={{ fontWeight: 500 }}>Sam - Dim:</span>
                  <span style={{ marginLeft: '0.5rem' }}>12:00 - 00:00</span>
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
              <a href="#" className="footer-legal-link">
                Mentions légales
              </a>
              <a href="#" className="footer-legal-link">
                Politique de confidentialité
              </a>
              <a href="#" className="footer-legal-link">
                CGU
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;