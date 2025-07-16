import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut, 
  ChevronDown,
  Edit,
  Key,
  Moon,
  Sun,
  Globe,
  Download,
  Activity
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const UserDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null;

  console.log('user ', user)

  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    // Ici vous ajouteriez la logique pour changer le thème
  };

  const menuItems = [
    {
      section: 'Profil',
      items: [
        {
          icon: User,
          label: 'Mon Profil',
          description: 'Gérer mes informations personnelles',
          action: () => console.log('Ouvrir profil')
        },
        {
          icon: Edit,
          label: 'Modifier le Profil',
          description: 'Changer photo, nom, email',
          action: () => console.log('Modifier profil')
        },
        {
          icon: Key,
          label: 'Changer le Mot de Passe',
          description: 'Sécuriser mon compte',
          action: () => console.log('Changer mot de passe')
        }
      ]
    },
    {
      section: 'Préférences',
      items: [
        {
          icon: Settings,
          label: 'Paramètres',
          description: 'Configuration générale',
          action: () => console.log('Ouvrir paramètres')
        },
        {
          icon: Bell,
          label: 'Notifications',
          description: 'Gérer les alertes',
          badge: '3',
          action: () => console.log('Ouvrir notifications')
        },
        {
          icon: theme === 'light' ? Moon : Sun,
          label: theme === 'light' ? 'Mode Sombre' : 'Mode Clair',
          description: 'Changer l\'apparence',
          action: toggleTheme,
          toggle: true
        },
        {
          icon: Globe,
          label: 'Langue',
          description: 'Français',
          action: () => console.log('Changer langue')
        }
      ]
    },
    {
      section: 'Système',
      items: [
        {
          icon: Shield,
          label: 'Sécurité',
          description: 'Sessions actives, 2FA',
          action: () => console.log('Ouvrir sécurité')
        },
        {
          icon: Activity,
          label: 'Mon Activité',
          description: 'Historique de mes actions',
          action: () => console.log('Voir activité')
        },
        {
          icon: Download,
          label: 'Exporter Données',
          description: 'Télécharger mes informations',
          action: () => console.log('Exporter données')
        }
      ]
    },
    {
      section: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Aide & Support',
          description: 'Documentation, FAQ',
          action: () => console.log('Ouvrir aide')
        }
      ]
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium" style={{ backgroundColor: '#FF8C42' }}>
          <User size={16} />
        </div>
        <div className="sm:block text-left">
          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
          <p className="text-xs text-gray-600 capitalize">{user?.role}</p>
        </div>
        
        <ChevronDown 
          size={16} 
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-medium text-lg" style={{ backgroundColor: '#FF8C42' }}>
                {user?.name?.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
                <span 
                  className="inline-flex px-2 py-1 text-xs font-medium rounded-full text-white mt-1"
                  style={{ backgroundColor: '#FFB84D' }}
                >
                  {user?.role === 'ADMIN' ? 'Administrateur' : user?.role}
                </span>
              </div>
            </div>
          </div>

          {/* Menu Sections */}
          <div className="max-h-96 overflow-y-auto">
            {menuItems.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <div className="px-4 py-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {section.section}
                  </p>
                </div>
                
                {section.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={itemIndex}
                      onClick={() => {
                        item.action();
                        if (!item.toggle) setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200 text-left"
                    >
                      <div className="flex-shrink-0">
                        <Icon size={18} className="text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900">{item.label}</p>
                          {item.badge && (
                            <span 
                              className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white rounded-full"
                              style={{ backgroundColor: '#FF8C42' }}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </button>
                  );
                })}
                
                {sectionIndex < menuItems.length - 1 && (
                  <div className="my-2 border-t border-gray-100"></div>
                )}
              </div>
            ))}
          </div>

          {/* Logout Button */}
          <div className="border-t border-gray-100 mt-2">
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
            >
              <LogOut size={18} />
              <div>
                <p className="font-medium">Déconnexion</p>
                <p className="text-sm text-red-500">Fermer la session</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;