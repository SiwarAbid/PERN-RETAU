import { ChefHat, Star } from 'lucide-react';

interface LoyaltyCardProps {
  customerName: string;
  points: number;
}

export default function LoyaltyCard({ customerName, points }: LoyaltyCardProps) {
  const progressPercentage = (points % 100) / 100 * 100;

  return (
    <div className="relative w-4xl max-w-md">
      {/* Carte principale */}
      <div className="bg-gradient-to-br from-orange-300 via-orange-400 to-yellow-500 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
        <div className="relative p-6 text-white">
          {/* Motif décoratif */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <div className="w-full h-full bg-white rounded-full transform translate-x-16 -translate-y-16"></div>
          </div>
          
          {/* Header avec logo */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 p-3 rounded-full backdrop-blur-sm">
                <ChefHat className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-wide">Sweet Corner</h2>
                <p className="text-sm opacity-90">Cuillère d’Or</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full backdrop-blur-sm">
                <Star className="w-4 h-4 inline mr-1 pb-1 text-orange-600" />
                <span className="text-sm font-semibold text-orange-600">VIP</span>
              </div>
            </div>
          </div>

          {/* Nom du client */}
          <div className="mb-6">
            <p className="text-sm opacity-80 uppercase tracking-wide">Titulaire</p>
            <h3 className="text-xl font-bold">{customerName}</h3>
          </div>

          {/* Points */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm opacity-80">Points disponibles</span>
              <span className="text-2xl font-bold">{points}</span>
            </div>
            
            {/* Barre de progression */}
            <div className="w-full bg-white bg-opacity-20 rounded-full h-3 backdrop-blur-sm">
              <div 
                className="bg-white h-3 rounded-full transition-all duration-1000 ease-out shadow-lg"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Footer avec infos restaurant */}
        <div className="bg-black bg-opacity-20 backdrop-blur-sm px-6 py-4">
          <div className="flex items-center justify-between text-sm">
          </div>
        </div>
      </div>

      {/* Reflet de la carte */}
      <div className="absolute -bottom-2 left-4 right-4 h-8 bg-gradient-to-br from-orange-400 to-yellow-500 opacity-20 blur-xl rounded-3xl"></div>
    </div>
  );
}