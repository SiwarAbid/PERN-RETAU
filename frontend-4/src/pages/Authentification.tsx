import React, { useState, useEffect } from 'react';
import FloatingIngredients from '../components/FloatingIngredients';
import AuthCard from '../components/AuthCard';
import '../assets/style/authentification.css'
const Authntification: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const updateTheme = (): void => {
      const hour = new Date().getHours();
      // Mode sombre entre 18h et 6h
      setIsDark(hour >= 18 || hour < 6);
    };

    updateTheme();
    const interval = setInterval(updateTheme, 60000); // Vérifier toutes les minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen transition-all duration-1000 relative overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-br from-[#9f754c] via-[#9f754c]/80 to-[#f8bb4c]/60' 
        : 'bg-gradient-to-br from-[#fef6e5] via-[#f9d1b8]/50 to-[#f8bb4c]/30'
    }`}>
      <FloatingIngredients isDark={isDark} />
      
      {/* Overlay décoratif */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
        <AuthCard isDark={isDark} />
      </div>

      {/* Indicateur de mode */}
      <div className={`fixed top-4 right-4 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm ${
        isDark 
          ? 'bg-[#9f754c]/20 text-[#fef6e5] border border-[#f8bb4c]/30' 
          : 'bg-[#fef6e5]/80 text-[#9f754c] border border-[#f9d1b8]/50'
      }`}>
        {isDark ? '🌙 Ambiance du soir' : '☀️ Fraîcheur du jour'}
      </div>
    </div>
  );
};

export default Authntification;