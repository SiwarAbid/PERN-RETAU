import { useState } from 'react';
import { Menu, X, User, Sun, Moon, ChefHat } from 'lucide-react';
import '../css/Accuil.css';

type HeaderProps = {
  isDark: boolean;
  toggleTheme: () => void;
};

function Header({ isDark, toggleTheme }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Accueil', href: '#accueil' },
    { name: 'Menu', href: '#menu' },
    { name: 'Nos Chefs', href: '#chefs' },
    { name: 'À propos', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];
//    bg-neutral-50/95 dark:bg-brown-900/95 

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 
    backdrop-blur-md 
    ${
    isDark 
      ? 'bg-gradient-to-br from-[#9f754c] via-[#9f754c]/80 to-[#f8bb4c]/60' 
      : 'bg-gradient-to-br from-[#fef6e5] via-[#f9d1b8]/50 to-[#f8bb4c]/30'
    }
    border-b border-secondary-200 dark:border-brown-700 
    transition-all duration-300`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-primary-500" />
            <span className="text-xl font-bold text-brown-900 dark:text-neutral-50">
              SWEET<span className="text-primary-500">Corner</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-brown-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-secondary-100 dark:bg-brown-800 hover:bg-secondary-200 dark:hover:bg-brown-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-primary-500" />
              ) : (
                <Moon className="h-5 w-5 text-brown-600" />
              )}
            </button>

            {/* Profile avatar */}
            <button className="p-2 rounded-full bg-primary-500 hover:bg-primary-600 transition-colors duration-200">
              <User className="h-5 w-5 text-white" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-brown-800 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-brown-600 dark:text-neutral-300" />
              ) : (
                <Menu className="h-6 w-6 text-brown-600 dark:text-neutral-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-brown-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-secondary-50 dark:hover:bg-brown-800 rounded-lg transition-colors duration-200"
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