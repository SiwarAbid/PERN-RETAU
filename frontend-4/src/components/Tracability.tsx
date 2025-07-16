import React, { useState } from 'react';
import { Search, Calendar, User, Activity, Filter, Download, Eye } from 'lucide-react';
import type { ActivityLog as ActivityLogType } from '../types/user';

const ActivityLog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('today');
  const [actionFilter, setActionFilter] = useState('all');

  // Mock data
  const activities: ActivityLogType[] = [
    {
      id: '1',
      adminId: '1',
      adminName: 'Administrateur',
      action: 'Création',
      resource: 'Client',
      details: 'Nouveau client ajouté: Marie Dubois (marie.dubois@email.com)',
      timestamp: '2024-01-15T14:30:00'
    },
    {
      id: '2',
      adminId: '1',
      adminName: 'Administrateur',
      action: 'Modification',
      resource: 'Plat',
      details: 'Prix du "Coq au vin" modifié de 26.50€ à 28.50€',
      timestamp: '2024-01-15T13:45:00'
    },
    {
      id: '3',
      adminId: '1',
      adminName: 'Administrateur',
      action: 'Suppression',
      resource: 'Employé',
      details: 'Employé supprimé: Thomas Petit (fin de contrat)',
      timestamp: '2024-01-15T11:20:00'
    },
    {
      id: '4',
      adminId: '1',
      adminName: 'Administrateur',
      action: 'Connexion',
      resource: 'Système',
      details: 'Connexion à l\'interface d\'administration',
      timestamp: '2024-01-15T09:15:00'
    },
    {
      id: '5',
      adminId: '1',
      adminName: 'Administrateur',
      action: 'Modification',
      resource: 'Restaurant',
      details: 'Horaires d\'ouverture mis à jour',
      timestamp: '2024-01-14T16:30:00'
    },
    {
      id: '6',
      adminId: '1',
      adminName: 'Administrateur',
      action: 'Création',
      resource: 'Plat',
      details: 'Nouveau plat ajouté: "Tarte aux pommes maison"',
      timestamp: '2024-01-14T15:10:00'
    },
    {
      id: '7',
      adminId: '1',
      adminName: 'Administrateur',
      action: 'Réponse',
      resource: 'Avis',
      details: 'Réponse ajoutée à l\'avis de Jean Martin (5 étoiles)',
      timestamp: '2024-01-14T14:25:00'
    },
    {
      id: '8',
      adminId: '1',
      adminName: 'Administrateur',
      action: 'Consultation',
      resource: 'Ventes',
      details: 'Export des données de ventes pour la période du 01/01 au 14/01',
      timestamp: '2024-01-14T10:45:00'
    }
  ];

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.adminName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const activityDate = new Date(activity.timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    let matchesDate = true;
    if (dateFilter === 'today') {
      matchesDate = activityDate.toDateString() === today.toDateString();
    } else if (dateFilter === 'yesterday') {
      matchesDate = activityDate.toDateString() === yesterday.toDateString();
    } else if (dateFilter === 'week') {
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      matchesDate = activityDate >= weekAgo;
    }
    
    const matchesAction = actionFilter === 'all' || activity.action.toLowerCase() === actionFilter;
    
    return matchesSearch && matchesDate && matchesAction;
  });

  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case 'création': return '#10B981'; // Vert
      case 'modification': return '#F59E0B'; // Orange
      case 'suppression': return '#EF4444'; // Rouge
      case 'connexion': return '#3B82F6'; // Bleu
      case 'consultation': return '#6B7280'; // Gris
      case 'réponse': return '#8B5CF6'; // Violet
      default: return '#6B7280';
    }
  };

  const getResourceIcon = (resource: string) => {
    switch (resource.toLowerCase()) {
      case 'client': return '👤';
      case 'employé': return '👥';
      case 'plat': return '🍽️';
      case 'restaurant': return '🏪';
      case 'avis': return '⭐';
      case 'ventes': return '💰';
      case 'système': return '⚙️';
      default: return '📄';
    }
  };

  const getActivityStats = () => {
    const today = new Date().toDateString();
    const todayActivities = activities.filter(a => new Date(a.timestamp).toDateString() === today);
    
    const actionCounts = activities.reduce((acc, activity) => {
      acc[activity.action] = (acc[activity.action] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: activities.length,
      today: todayActivities.length,
      mostCommonAction: Object.entries(actionCounts).sort(([,a], [,b]) => b - a)[0]?.[0] || 'Aucune'
    };
  };

  const stats = getActivityStats();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Traçabilité des Actions</h1>
          <p className="text-gray-600">Suivez toutes les actions effectuées par les administrateurs</p>
        </div>
        <button 
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:shadow-md transition-all duration-200"
          style={{ backgroundColor: '#FF8C42' }}
        >
          <Download size={20} />
          Exporter le Log
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Actions</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Activity size={24} style={{ color: '#FF8C42' }} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Aujourd'hui</p>
              <p className="text-2xl font-bold text-gray-900">{stats.today}</p>
            </div>
            <Calendar size={24} style={{ color: '#FFB84D' }} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Action Fréquente</p>
              <p className="text-lg font-bold text-gray-900">{stats.mostCommonAction}</p>
            </div>
            <Filter size={24} style={{ color: '#F4C2A1' }} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Administrateurs</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
            <User size={24} style={{ color: '#A67C5A' }} />
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
              placeholder="Rechercher dans les logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <select 
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="today">Aujourd'hui</option>
            <option value="yesterday">Hier</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="all">Toutes les périodes</option>
          </select>
          <select 
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">Toutes les actions</option>
            <option value="création">Création</option>
            <option value="modification">Modification</option>
            <option value="suppression">Suppression</option>
            <option value="connexion">Connexion</option>
            <option value="consultation">Consultation</option>
            <option value="réponse">Réponse</option>
          </select>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Journal d'Activité</h2>
        
        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div className="flex-shrink-0">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm"
                  style={{ backgroundColor: getActionColor(activity.action) }}
                >
                  {getResourceIcon(activity.resource)}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span 
                    className="inline-flex px-2 py-1 text-xs font-medium rounded-full text-white"
                    style={{ backgroundColor: getActionColor(activity.action) }}
                  >
                    {activity.action}
                  </span>
                  <span className="text-sm font-medium text-gray-700">{activity.resource}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">par {activity.adminName}</span>
                </div>
                
                <p className="text-gray-700 mb-2">{activity.details}</p>
                
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(activity.timestamp).toLocaleDateString('fr-FR')}
                  </div>
                  <div className="flex items-center gap-1">
                    <Activity size={12} />
                    {new Date(activity.timestamp).toLocaleTimeString('fr-FR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                  <Eye size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-8">
            <Activity size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Aucune activité trouvée pour les critères sélectionnés</p>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Affichage de 1 à {filteredActivities.length} sur {activities.length} activités
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

export default ActivityLog;