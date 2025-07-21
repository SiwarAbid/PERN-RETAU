import React, { useState } from 'react';
import { Save, MapPin, Phone, Mail, Globe, Facebook, Instagram, Twitter, Clock, Edit } from 'lucide-react';
import type { RestaurantInfo } from '../../../types/user';

const RestaurantProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo>({
    id: '1',
    name: 'Le Petit Gourmet',
    address: '123 Rue de la Gastronomie, 75001 Paris',
    phone: '01 42 33 44 55',
    email: 'contact@lepetitgourmet.fr',
    description: 'Restaurant gastronomique français proposant une cuisine traditionnelle revisitée avec des produits frais et de saison. Notre chef étoilé vous propose une expérience culinaire unique dans un cadre élégant et chaleureux.',
    openingHours: 'Lun-Sam: 12h-14h30, 19h-22h30 | Dim: Fermé',
    website: 'https://www.lepetitgourmet.fr',
    socialMedia: {
      facebook: 'https://facebook.com/lepetitgourmet',
      instagram: 'https://instagram.com/lepetitgourmet',
      twitter: 'https://twitter.com/lepetitgourmet'
    }
  });

  const handleSave = () => {
    // Ici vous ajouteriez la logique pour sauvegarder les données
    setIsEditing(false);
    console.log('Informations sauvegardées:', restaurantInfo);
  };

  const handleInputChange = (field: keyof RestaurantInfo, value: string) => {
    setRestaurantInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialMediaChange = (platform: keyof RestaurantInfo['socialMedia'], value: string) => {
    setRestaurantInfo(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profil du Restaurant</h1>
          <p className="text-gray-600">Gérez les informations de votre établissement</p>
        </div>
        <button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:shadow-md transition-all duration-200"
          style={{ backgroundColor: '#FF8C42' }}
        >
          {isEditing ? <Save size={20} /> : <Edit size={20} />}
          {isEditing ? 'Sauvegarder' : 'Modifier'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations principales */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Informations Générales</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom du restaurant</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={restaurantInfo.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{restaurantInfo.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                {isEditing ? (
                  <textarea
                    value={restaurantInfo.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">{restaurantInfo.description}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Horaires d'ouverture</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={restaurantInfo.openingHours}
                    onChange={(e) => handleInputChange('openingHours', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    <p className="text-gray-700">{restaurantInfo.openingHours}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Coordonnées */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Coordonnées</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={restaurantInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    <p className="text-gray-700">{restaurantInfo.address}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={restaurantInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-gray-400" />
                    <p className="text-gray-700">{restaurantInfo.phone}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={restaurantInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-gray-400" />
                    <p className="text-gray-700">{restaurantInfo.email}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site web</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={restaurantInfo.website || ''}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Globe size={16} className="text-gray-400" />
                    <a href={restaurantInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      {restaurantInfo.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Réseaux Sociaux</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={restaurantInfo.socialMedia.facebook || ''}
                    onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="https://facebook.com/votrepage"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Facebook size={16} style={{ color: '#1877F2' }} />
                    {restaurantInfo.socialMedia.facebook ? (
                      <a href={restaurantInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                        Page Facebook
                      </a>
                    ) : (
                      <span className="text-gray-500">Non configuré</span>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={restaurantInfo.socialMedia.instagram || ''}
                    onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="https://instagram.com/votrepage"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Instagram size={16} style={{ color: '#E4405F' }} />
                    {restaurantInfo.socialMedia.instagram ? (
                      <a href={restaurantInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                        Profil Instagram
                      </a>
                    ) : (
                      <span className="text-gray-500">Non configuré</span>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={restaurantInfo.socialMedia.twitter || ''}
                    onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="https://twitter.com/votrepage"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Twitter size={16} style={{ color: '#1DA1F2' }} />
                    {restaurantInfo.socialMedia.twitter ? (
                      <a href={restaurantInfo.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                        Profil Twitter
                      </a>
                    ) : (
                      <span className="text-gray-500">Non configuré</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Statistiques rapides */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Statistiques</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#FFF7ED' }}>
                <span className="text-sm font-medium text-gray-700">Clients totaux</span>
                <span className="text-lg font-bold" style={{ color: '#FF8C42' }}>1,247</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#FFF7ED' }}>
                <span className="text-sm font-medium text-gray-700">Plats au menu</span>
                <span className="text-lg font-bold" style={{ color: '#FF8C42' }}>87</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#FFF7ED' }}>
                <span className="text-sm font-medium text-gray-700">Note moyenne</span>
                <span className="text-lg font-bold" style={{ color: '#FF8C42' }}>4.8/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;