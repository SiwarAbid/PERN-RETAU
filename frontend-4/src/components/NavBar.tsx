import React from 'react';
import { Bell, Search, Settings } from 'lucide-react';
import UserDropdown from './UserDropdown';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full h-16 flex items-center justify-between px-6 shadow-md bg-white fixed top-0 left-0 z-50">
  {/* Left Side - Logo + Search */}
  <div className="flex items-center gap-17">
    {/* Logo / Titre */}
    <div className="relative">
        <h1 className="text-2xl font-bold text-[#FF8C42] whitespace-nowrap">SWEET CORNER</h1>
        <h3>Espace admin</h3>
    </div>
    {/* Search Bar */}
    <div className="relative w-[750px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      <input
        type="text"
        placeholder="Rechercher..."
        className="w-full pl-10 pr-4 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
      />
    </div>
  </div>

  {/* Right Side - Actions */}
  <div className="flex items-center gap-4">
    {/* Notifications */}
    <div className="relative">
      <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
        <Bell size={20} />
      </button>
      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-medium text-white flex items-center justify-center" style={{ backgroundColor: '#FF8C42' }}>
        3
      </div>
    </div>

    {/* Settings */}
    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
      <Settings size={20} />
    </button>

    {/* Divider */}
    <div className="h-6 w-px bg-gray-300" />

    {/* Profile */}
    <UserDropdown />
  </div>
</nav>

  );
};

export default Navbar;