import React from 'react';
import { Plus, ShoppingBag } from 'lucide-react';

interface PointsManagerProps {
  points: number;
  onAddPoints: () => void;
  onUsePoints: () => void;
  canUsePoints: boolean;
}

export default function PointsManager({ points, onAddPoints, onUsePoints, canUsePoints }: PointsManagerProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Gestion des Points</h3>
      
      <div className="space-y-4">
        {/* Simuler une commande */}
        <button
          onClick={onAddPoints}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md"
        >
          <div className="flex items-center justify-center space-x-3">
            <ShoppingBag className="w-6 h-6" />
            <span>Passer une Commande (+10 points)</span>
          </div>
        </button>

        {/* Utiliser les points */}
        <button
          onClick={onUsePoints}
          disabled={!canUsePoints}
          className={`w-full font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform shadow-md ${
            canUsePoints
              ? 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <div className="flex items-center justify-center space-x-3">
            <Plus className="w-6 h-6" />
            <span>
              {canUsePoints ? 'Utiliser 100 Points' : `Il vous faut ${100 - (points % 100)} points de plus`}
            </span>
          </div>
        </button>
      </div>

      {/* Statistiques */}
      <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-600">Points Totaux</p>
            <p className="text-2xl font-bold text-orange-600">{points}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Récompenses Gagnées</p>
            <p className="text-2xl font-bold text-orange-600">{Math.floor(points / 100)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}