import { useState } from 'react';
import { Menu, X, User, Sun, Moon, ChefHat, LogOut } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const navigate = useNavigate();

  const navItems = [
    { name: 'Accueil', href: '#accueil' },
    { name: 'Menu', href: '#menu' },
    { name: 'Nos Chefs', href: '#chefs' },
    { name: 'À propos', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <ChefHat className="icon-lg icon-primary" />
            <span className="logo-text">
              Sweet <span className="logo-accent">Corner</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="nav-link"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="header-actions">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
            >
              {!isDark ? (
                <Sun className="icon icon-primary" />
              ) : (
                <Moon className="icon" />
              )}
            </button>

            {/* Profile avatar */}
            <button className="profile-btn">
            { (user && user.image) 
              ? <img src={user.image} className="icon icon-white" alt={user.name}  /> 
              : <User className="icon icon-white" /> 
            }
            </button>

            {/* Logout button */}
            <button 
              className="logout-btn"
              aria-label="Se déconnecter"
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/')
                console.log('Déconnexion...');
                alert('Déconnexion réussie !');
              }}
            >
              <LogOut className="icon" />
            </button>


            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-menu-btn"
            >
              {isMenuOpen ? (
                <X className="icon" />
              ) : (
                <Menu className="icon" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            <nav>
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;