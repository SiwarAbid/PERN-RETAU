import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  ChefHat, 
  // Settings, 
  MessageSquare, 
  TrendingUp,
  Star,
  LogOut,
  Activity
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const { logout, user } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'employees', label: 'Employés', icon: UserCheck },
    { id: 'dishes', label: 'Plats', icon: ChefHat },
    { id: 'reviews', label: 'Avis', icon: Star },
    { id: 'sales', label: 'Ventes', icon: TrendingUp },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'activity', label: 'Traçabilité', icon: Activity },
    // { id: 'restaurant', label: 'Profil Restaurant', icon: Settings },
  ];

  return (
    <div className="w-64 h-screen fixed left-0 top-16 overflow-y-auto" style={{ backgroundColor: '#A67C5A' }}>
      <div className="p-6">
        {/* <h1 className="text-2xl font-bold text-white mb-8">Admin Restaurant</h1> */}
        
        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-white text-gray-900 shadow-md'
                    : 'text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <Icon size={20} className="mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-8 pt-6 border-t border-white border-opacity-20 sticky bottom-0" style={{ backgroundColor: '#A67C5A' }}>
          <div className="text-white text-sm mb-4">
            <p className="font-semibold">{user?.name}</p>
            <p className="opacity-75">{user?.email}</p>
          </div>
          
          <button
            onClick={logout}
            className="w-full flex items-center px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-200"
          >
            <LogOut size={20} className="mr-3" />
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;