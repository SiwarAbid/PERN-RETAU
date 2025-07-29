import React from 'react';
import { Users, ChefHat, Star, TrendingUp, MessageSquare, Activity } from 'lucide-react';
import StatsCard from './StatsCard';
import RecentActivity from './RecentActivity';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Clients Actifs',
      value: '1,247',
      icon: Users,
      change: '+12%',
      changeType: 'positive' as const,
      color: '#FF8C42'
    },
    {
      title: 'Plats au Menu',
      value: '87',
      icon: ChefHat,
      change: '+3',
      changeType: 'positive' as const,
      color: '#FFB84D'
    },
    {
      title: 'Note Moyenne',
      value: '4.8',
      icon: Star,
      change: '+0.2',
      changeType: 'positive' as const,
      color: '#F4C2A1'
    },
    {
      title: 'Ventes du Jour',
      value: '€2,847',
      icon: TrendingUp,
      change: '+18%',
      changeType: 'positive' as const,
      color: '#A67C5A'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de Bord</h1>
        <p className="text-gray-600">Vue d'ensemble de votre restaurant</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions Rapides</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 text-left">
              <Users className="mb-2" style={{ color: '#FF8C42' }} />
              <p className="font-medium text-gray-900">Nouveau Client</p>
              <p className="text-sm text-gray-600">Ajouter un client</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 text-left">
              <ChefHat className="mb-2" style={{ color: '#FFB84D' }} />
              <p className="font-medium text-gray-900">Nouveau Plat</p>
              <p className="text-sm text-gray-600">Ajouter au menu</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 text-left">
              <MessageSquare className="mb-2" style={{ color: '#F4C2A1' }} />
              <p className="font-medium text-gray-900">Messages</p>
              <p className="text-sm text-gray-600">3 non lus</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 text-left">
              <Activity className="mb-2" style={{ color: '#A67C5A' }} />
              <p className="font-medium text-gray-900">Rapport</p>
              <p className="text-sm text-gray-600">Voir l'activité</p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;