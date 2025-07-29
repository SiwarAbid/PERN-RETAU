import { useState } from 'react';
import { Menu, X, User, Sun, Moon, ChefHat, LogOut, ShoppingCart } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import Cart from './Menu/Cart';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, showModalCart] = useState(false);
  const navigate = useNavigate();

  const isMobile = () => window.innerWidth <= 768;

  const navItems = [
    <Link key="home" to="/accueil" className={isMobile() ? 'nav-link-mobile' : 'nav-link'}>Accueil</Link>,
    <Link key="menu" to="/menu" className={isMobile() ? 'nav-link-mobile' : 'nav-link'}>Menu</Link>,
    <Link key="profil" to="/profil" className={isMobile() ? 'nav-link-mobile' : 'nav-link'}>Profile</Link>,
    <Link key="orders" to="/orders" className={isMobile() ? 'nav-link-mobile' : 'nav-link'}>Mes commandes</Link>,
    <Link key="contact" to="/accueil#contact" className={isMobile() ? 'nav-link-mobile' : 'nav-link'}>Contact</Link>,
  ];

  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
  const isConnected = user !== null;

  const { cartItems, clearCart, updateQuantity } = useCart()

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Votre panier est vide !');
      return;
    }
    
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = total * 0.1;
    const final = total - discount;
    
    alert(`Commande confirmée !\nTotal: ${final.toFixed(2)} TND\nMerci pour votre commande !`);
    clearCart();
  };

    
const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

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
              item
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

              <div className="relative group">
            {/* Profile avatar */}
            { (user && user.image)
              ?
                <button
                  className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center border-0 focus:outline-none ${
                    isConnected
                      ? 'ring ring-green-500 ring-opacity-50 hover:ring-opacity-75 duration-300 transition-all'
                      : ''
                  }`}
                >
                  <img
                    src={`${apiBase}/uploads/${user.image}`}
                    alt={user.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </button>
              : <button className={`profile-btn ${isConnected 
                    ? 'ring ring-green-500 ring-opacity-50 hover:ring-opacity-75 duration-300 transition-all' 
                    : ''
                  } w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white p-0`}>
              <User className="icon icon-white" />
            </button>}
            {isConnected && user?.name && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-max px-2 py-1 rounded bg-white text-gray-800 text-xs shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                {user.name}
              </div>
            )}
            </div>
            {/* Cart button */}
            <button className='profile-btn' onClick={() => showModalCart(!isOpen)}>
              <ShoppingCart className='icon icon-white' />
            </button>
            <div className={`absolute right-0 top-full mt-2 w-auto z-50  overflow-hidden ${isOpen ? 'block' : 'hidden'}`}>
              <Cart
                onUpdateQuantity={updateQuantity}
                onCheckout={handleCheckout}
                onClearCart={clearCart}
              />
            </div>
            {/* Logout button */}
            <button 
              className="logout-btn"
              aria-label="Se déconnecter"
              onClick={() => {
                localStorage.clear()
                navigate('/')
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
                item
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;