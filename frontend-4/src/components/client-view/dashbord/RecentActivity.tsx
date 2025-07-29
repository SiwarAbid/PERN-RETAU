import React from 'react';
import { Clock } from 'lucide-react';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: '1',
      action: 'Nouveau client enregistré',
      details: 'Marie Dubois a été ajoutée à la base de données',
      timestamp: 'Il y a 5 minutes',
      type: 'client'
    },
    {
      id: '2',
      action: 'Plat modifié',
      details: 'Prix du "Coq au vin" mis à jour à 28€',
      timestamp: 'Il y a 15 minutes',
      type: 'dish'
    },
    {
      id: '3',
      action: 'Nouvel avis reçu',
      details: 'Avis 5 étoiles de Jean Martin',
      timestamp: 'Il y a 1 heure',
      type: 'review'
    },
    {
      id: '4',
      action: 'Employé ajouté',
      details: 'Sophie Laurent - Chef de partie',
      timestamp: 'Il y a 2 heures',
      type: 'employee'
    }
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'client': return '#FF8C42';
      case 'dish': return '#FFB84D';
      case 'review': return '#F4C2A1';
      case 'employee': return '#A67C5A';
      default: return '#6B7280';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Activité Récente</h2>
        <button className="text-sm font-medium" style={{ color: '#FF8C42' }}>
          Voir tout
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div 
              className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
              style={{ backgroundColor: getActivityColor(activity.type) }}
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900">{activity.action}</p>
              <p className="text-sm text-gray-600">{activity.details}</p>
              <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                <Clock size={12} />
                {activity.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;