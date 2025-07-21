import React, { useState } from 'react';
import { Search, Star, MessageSquare, Calendar, User, Reply } from 'lucide-react';
// import type { Review } from '../types/user';

const ReviewList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState('');

  // Mock data
  const reviews = [
    {
      id: 1,
      clientName: 'Marie Dubois',
      rating: 5,
      comment: 'Excellente expérience ! Le service était impeccable et les plats délicieux. Je recommande vivement le coq au vin, un vrai délice. L\'ambiance est chaleureuse et le personnel très attentionné.',
      date: '2024-01-15',
      response: 'Merci beaucoup Marie pour ce merveilleux commentaire ! Nous sommes ravis que vous ayez apprécié votre soirée chez nous.'
    },
    {
      id: '2',
      clientName: 'Jean Martin',
      rating: 4,
      comment: 'Très bon restaurant avec une cuisine de qualité. Seul bémol, l\'attente était un peu longue mais cela en valait la peine. Les desserts sont exceptionnels !',
      date: '2024-01-12',
    },
    {
      id: '3',
      clientName: 'Sophie Laurent',
      rating: 5,
      comment: 'Une soirée parfaite ! Tout était parfait du début à la fin. Le chef mérite ses étoiles, c\'est de la grande cuisine française comme on l\'aime.',
      date: '2024-01-10',
      response: 'Sophie, votre commentaire nous touche énormément. Merci de faire confiance à notre équipe !'
    },
    {
      id: '4',
      clientName: 'Pierre Durand',
      rating: 3,
      comment: 'Correct sans plus. Les plats étaient bons mais sans surprise. Le service pourrait être amélioré, notamment au niveau de la rapidité.',
      date: '2024-01-08',
    },
    {
      id: '5',
      clientName: 'Isabelle Moreau',
      rating: 5,
      comment: 'Magnifique découverte ! Nous avons passé un excellent moment. La bouillabaisse était divine et le service aux petits soins. Nous reviendrons c\'est sûr !',
      date: '2024-01-05',
    }
  ];

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = selectedRating === '' || review.rating.toString() === selectedRating;
    return matchesSearch && matchesRating;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const getAverageRating = () => {
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  const distribution = getRatingDistribution();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Avis</h1>
          <p className="text-gray-600">Consultez et répondez aux avis de vos clients</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Note Moyenne</p>
              <p className="text-2xl font-bold text-gray-900">{getAverageRating()}/5</p>
            </div>
            <div className="flex">
              {renderStars(Math.round(parseFloat(getAverageRating())))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Avis</p>
              <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
            </div>
            <MessageSquare size={24} style={{ color: '#FF8C42' }} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avis 5 étoiles</p>
              <p className="text-2xl font-bold text-gray-900">{distribution[5]}</p>
            </div>
            <Star size={24} className="text-yellow-400 fill-current" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Réponses</p>
              <p className="text-2xl font-bold text-gray-900">{reviews.filter(r => r.response).length}</p>
            </div>
            <Reply size={24} style={{ color: '#FFB84D' }} />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher dans les avis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <select 
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Toutes les notes</option>
            <option value="5">5 étoiles</option>
            <option value="4">4 étoiles</option>
            <option value="3">3 étoiles</option>
            <option value="2">2 étoiles</option>
            <option value="1">1 étoile</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F5F1E8' }}>
                  <User size={20} style={{ color: '#A67C5A' }} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{review.clientName}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm text-gray-500">•</span>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar size={14} />
                      {new Date(review.date).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>

            {review.response ? (
              <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: '#FFF7ED' }}>
                <div className="flex items-center gap-2 mb-2">
                  <Reply size={16} style={{ color: '#FF8C42' }} />
                  <span className="text-sm font-medium" style={{ color: '#FF8C42' }}>Réponse du restaurant</span>
                </div>
                <p className="text-gray-700">{review.response}</p>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button 
                  className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:shadow-md transition-all duration-200"
                  style={{ backgroundColor: '#FF8C42' }}
                >
                  <Reply size={16} />
                  Répondre à cet avis
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Affichage de 1 à {filteredReviews.length} sur {reviews.length} avis
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
              Précédent
            </button>
            <button className="px-3 py-1 text-sm text-white rounded" style={{ backgroundColor: '#FF8C42' }}>
              1
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewList;