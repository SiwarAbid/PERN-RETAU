import React from 'react';
import { X, Gift, Sparkles } from 'lucide-react';

interface RewardModalProps {
  isOpen: boolean;
  reward: string;
  onClose: () => void;
}

export default function RewardModal({ isOpen, reward, onClose }: RewardModalProps) {
  if (!isOpen) return null;

  const getRewardEmoji = (reward: string) => {
    if (reward.includes('Plat')) return '🍽️';
    if (reward.includes('Boisson')) return '🥤';
    if (reward.includes('Dessert')) return '🍰';
    if (reward.includes('Entrée')) return '🥗';
    return '💰';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 transform animate-bounce-in shadow-2xl border-4 border-gradient-to-r from-orange-400 to-yellow-400 relative overflow-hidden">
        {/* Effet de brillance de fond */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50 opacity-50"></div>
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center relative z-10">
          <div className="mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-400 via-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl animate-pulse border-4 border-white">
              <Gift className="w-10 h-10 text-white" />
              {/* Effet de brillance */}
              <div className="absolute inset-2 bg-gradient-to-br from-white/30 to-transparent rounded-full"></div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Félicitations !</h2>
            <div className="flex items-center justify-center space-x-2 text-orange-600">
              <Sparkles className="w-5 h-5" />
              <span className="text-lg font-semibold">Vous avez gagné</span>
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-200 mb-6">
            <div className="text-6xl mb-4">{getRewardEmoji(reward)}</div>
            <h3 className="text-2xl font-bold text-orange-700">{reward}</h3>
          </div>

          <p className="text-gray-600 mb-6">
            Montrez cette notification à notre équipe pour profiter de votre récompense !
          </p>

          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Parfait !
          </button>
        </div>
      </div>
    </div>
  );
}