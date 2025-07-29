import React, { useState, useRef } from 'react';
import { Gift, Sparkles, Zap } from 'lucide-react';

interface RewardWheelProps {
  onRewardSelected: (reward: string) => void;
  disabled: boolean;
}

const rewards = [
  { text: 'Plat Gratuit', color: 'from-red-400 via-red-500 to-red-600', icon: '🍽️', shadowColor: 'shadow-red-500/30' },
  { text: 'Boisson Gratuite', color: 'from-blue-400 via-blue-500 to-blue-600', icon: '🥤', shadowColor: 'shadow-blue-500/30' },
  { text: 'Dessert Gratuit', color: 'from-purple-400 via-purple-500 to-purple-600', icon: '🍰', shadowColor: 'shadow-purple-500/30' },
  { text: 'Remise 20%', color: 'from-green-400 via-green-500 to-green-600', icon: '💰', shadowColor: 'shadow-green-500/30' },
  { text: 'Entrée Gratuite', color: 'from-yellow-400 via-yellow-500 to-yellow-600', icon: '🥗', shadowColor: 'shadow-yellow-500/30' },
  { text: 'Remise 15%', color: 'from-pink-400 via-pink-500 to-pink-600', icon: '🎫', shadowColor: 'shadow-pink-500/30' },
];

export default function RewardWheel({ onRewardSelected, disabled }: RewardWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spinWheel = () => {
    if (isSpinning || disabled) return;

    setIsSpinning(true);
    setSelectedIndex(-1);
    
    // Rotation aléatoire entre 2160° et 3600° (6-10 tours complets)
    const randomRotation = Math.floor(Math.random() * 1440) + 2160;
    const finalRotation = rotation + randomRotation;
    
    setRotation(finalRotation);

    // Calculer quelle récompense est sélectionnée
    setTimeout(() => {
      const normalizedRotation = finalRotation % 360;
      const sectionAngle = 360 / rewards.length;
      const calculatedIndex = Math.floor((360 - normalizedRotation + sectionAngle / 2) / sectionAngle) % rewards.length;
      
      setSelectedIndex(calculatedIndex);
      
      // Attendre un peu avant de montrer le résultat
      setTimeout(() => {
        onRewardSelected(rewards[calculatedIndex].text);
        setIsSpinning(false);
      }, 1000);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Titre avec animation */}
      <div className="text-center mb-4">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent mb-2">
          Roue de la Fortune
        </h3>
        <p className="text-gray-600 flex items-center justify-center space-x-2">
          <Zap className="w-4 h-4 text-orange-500" />
          <span>Tournez pour découvrir votre récompense</span>
          <Zap className="w-4 h-4 text-orange-500" />
        </p>
      </div>

      <div className="relative">
        {/* Effets de lumière autour de la roue */}
        <div className={`absolute inset-0 rounded-full transition-all duration-1000 ${
          isSpinning ? 'animate-pulse bg-gradient-to-r from-orange-400 to-yellow-400 blur-xl opacity-60' : 'opacity-0'
        }`}></div>

        {/* Pointer amélioré */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 z-20">
          <div className="relative">
            <div className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-gradient-to-r from-yellow-400 to-orange-500 drop-shadow-2xl filter"></div>
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg"></div>
            {/* Effet de brillance sur le pointer */}
            <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full opacity-30 blur-sm ${
              isSpinning ? 'animate-ping' : ''
            }`}></div>
          </div>
        </div>

        {/* Roue principale */}
        <div className="relative w-96 h-96 rounded-full shadow-2xl overflow-hidden border-8 border-gradient-to-r from-orange-400 to-yellow-400">
          {/* Anneau extérieur décoratif */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 p-2">
            <div className="w-full h-full rounded-full bg-white p-1">
              <div
                ref={wheelRef}
                className={`w-full h-full rounded-full relative transition-transform ease-out ${
                  isSpinning ? 'duration-[4000ms]' : 'duration-1000'
                }`}
                style={{ 
                  transform: `rotate(${rotation}deg)`,
                  transformOrigin: 'center center'
                }}
              >
                {rewards.map((reward, index) => {
                  const angle = (360 / rewards.length) * index;
                  const nextAngle = (360 / rewards.length) * (index + 1);
                  const isSelected = selectedIndex === index && !isSpinning;
                  
                  return (
                    <div
                      key={index}
                      className={`absolute w-full h-full origin-center bg-gradient-to-br ${reward.color} transition-all duration-500 ${
                        isSelected ? `scale-105 ${reward.shadowColor} shadow-2xl` : ''
                      }`}
                      style={{
                        clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((angle * Math.PI) / 180)}% ${50 + 50 * Math.sin((angle * Math.PI) / 180)}%, ${50 + 50 * Math.cos((nextAngle * Math.PI) / 180)}% ${50 + 50 * Math.sin((nextAngle * Math.PI) / 180)}%)`,
                      }}
                    >
                      {/* Effet de brillance sur chaque section */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                        style={{
                          clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((angle * Math.PI) / 180)}% ${50 + 50 * Math.sin((angle * Math.PI) / 180)}%, ${50 + 50 * Math.cos((nextAngle * Math.PI) / 180)}% ${50 + 50 * Math.sin((nextAngle * Math.PI) / 180)}%)`,
                        }}
                      ></div>
                      
                      <div 
                        className={`absolute text-white font-bold text-sm flex flex-col items-center justify-center transition-all duration-300 ${
                          isSelected ? 'scale-110' : ''
                        }`}
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `translate(-50%, -50%) rotate(${angle + 30}deg) translateY(-100px)`,
                          width: '120px',
                          textAlign: 'center'
                        }}
                      >
                        <span className={`text-3xl mb-2 transition-all duration-300 ${
                          isSelected ? 'animate-bounce' : ''
                        }`}>{reward.icon}</span>
                        <span className="text-xs leading-tight font-semibold drop-shadow-lg">{reward.text}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Centre de la roue amélioré */}
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full shadow-2xl flex items-center justify-center z-10 border-4 border-white transition-all duration-300 ${
            isSpinning ? 'animate-pulse scale-110' : 'hover:scale-105'
          }`}>
            <Sparkles className={`w-10 h-10 text-white transition-all duration-300 ${
              isSpinning ? 'animate-spin' : ''
            }`} />
            {/* Effet de brillance au centre */}
            <div className="absolute inset-2 bg-gradient-to-br from-white/30 to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Particules d'effet autour de la roue */}
        {isSpinning && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              ></div>
            ))}
          </div>
        )}
      </div>

      {/* Bouton de rotation amélioré */}
      <button
        onClick={spinWheel}
        disabled={isSpinning || disabled}
        className={`relative px-10 py-5 rounded-2xl font-bold text-white text-xl transition-all duration-300 transform shadow-2xl overflow-hidden ${
          disabled 
            ? 'bg-gray-400 cursor-not-allowed' 
            : isSpinning 
              ? 'bg-gradient-to-r from-orange-400 to-yellow-400 cursor-wait scale-95' 
              : 'bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 hover:from-orange-600 hover:via-yellow-600 hover:to-orange-700 hover:scale-105 hover:shadow-orange-500/50 active:scale-95'
        }`}
      >
        {/* Effet de brillance sur le bouton */}
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-transform duration-1000 ${
          isSpinning ? 'translate-x-full' : '-translate-x-full hover:translate-x-full'
        }`}></div>
        
        <div className="relative flex items-center space-x-3">
          <Gift className={`w-7 h-7 transition-all duration-300 ${
            isSpinning ? 'animate-bounce' : ''
          }`} />
          <span>
            {isSpinning ? 'Rotation en cours...' : disabled ? 'Pas assez de points' : 'Tourner la Roue !'}
          </span>
          {!disabled && !isSpinning && (
            <Sparkles className="w-6 h-6 animate-pulse" />
          )}
        </div>
      </button>

      {/* Indicateur de progression pendant la rotation */}
      {isSpinning && (
        <div className="flex flex-col items-center space-y-2">
          <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-sm text-gray-600 animate-pulse">Détermination de votre récompense...</p>
        </div>
      )}
    </div>
  );
}