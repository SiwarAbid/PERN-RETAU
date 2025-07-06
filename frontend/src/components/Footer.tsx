import { Facebook, Instagram, Twitter, ChefHat, Mail, Phone, MapPin } from 'lucide-react';
import '../css/Accuil.css';

const Footer = () => {
  return (
    <footer className="bg-brown-900 dark:bg-brown-950 text-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <ChefHat className="h-8 w-8 text-primary-500" />
              <span className="text-xl font-bold">
                Saveurs<span className="text-primary-500">Délices</span>
              </span>
            </div>
            <p className="text-neutral-300 mb-4">
              Une expérience culinaire authentique où chaque plat raconte une histoire unique.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-neutral-400 hover:text-primary-500 transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-primary-500 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-primary-500 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a href="#accueil" className="text-neutral-400 hover:text-neutral-50 transition-colors duration-200">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#menu" className="text-neutral-400 hover:text-neutral-50 transition-colors duration-200">
                  Menu
                </a>
              </li>
              <li>
                <a href="#chefs" className="text-neutral-400 hover:text-neutral-50 transition-colors duration-200">
                  Nos Chefs
                </a>
              </li>
              <li>
                <a href="#about" className="text-neutral-400 hover:text-neutral-50 transition-colors duration-200">
                  À propos
                </a>
              </li>
              <li>
                <a href="#contact" className="text-neutral-400 hover:text-neutral-50 transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-neutral-400">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Rue de la Gastronomie, Paris</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@saveursdelices.fr</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Horaires</h3>
            <div className="space-y-2 text-neutral-400">
              <div>
                <span className="font-medium">Lun - Ven:</span>
                <span className="ml-2">11:30 - 23:00</span>
              </div>
              <div>
                <span className="font-medium">Sam - Dim:</span>
                <span className="ml-2">12:00 - 00:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-brown-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            © 2024 Saveurs Délices. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-neutral-400 hover:text-neutral-50 text-sm transition-colors duration-200">
              Mentions légales
            </a>
            <a href="#" className="text-neutral-400 hover:text-neutral-50 text-sm transition-colors duration-200">
              Politique de confidentialité
            </a>
            <a href="#" className="text-neutral-400 hover:text-neutral-50 text-sm transition-colors duration-200">
              CGU
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;