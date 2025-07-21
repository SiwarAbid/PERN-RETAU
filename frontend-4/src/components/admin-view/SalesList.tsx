import React, { useState } from 'react';
import { Search, DollarSign, TrendingUp, TrendingDown, Eye, Download } from 'lucide-react';
import type { Sale } from '../../types/user';

const SalesList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('today');

  // Mock data
  const sales: Sale[] = [
    {
      id: '1',
      date: '2024-01-15T19:30:00',
      total: 127.50,
      items: [
        { dish: 'Coq au Vin', quantity: 2, price: 28.50 },
        { dish: 'Tarte Tatin', quantity: 2, price: 12.00 },
        { dish: 'Vin Rouge Bordeaux', quantity: 1, price: 45.00 }
      ],
      clientId: '1'
    },
    {
      id: '2',
      date: '2024-01-15T20:15:00',
      total: 89.00,
      items: [
        { dish: 'Bouillabaisse Marseillaise', quantity: 1, price: 35.00 },
        { dish: 'Foie Gras Poêlé', quantity: 1, price: 42.00 },
        { dish: 'Café', quantity: 2, price: 6.00 }
      ],
      clientId: '2'
    },
    {
      id: '3',
      date: '2024-01-15T18:45:00',
      total: 156.80,
      items: [
        { dish: 'Menu Dégustation', quantity: 2, price: 75.00 },
        { dish: 'Champagne', quantity: 1, price: 65.00 }
      ]
    },
    {
      id: '4',
      date: '2024-01-14T19:00:00',
      total: 67.50,
      items: [
        { dish: 'Coq au Vin', quantity: 1, price: 28.50 },
        { dish: 'Salade César', quantity: 1, price: 18.00 },
        { dish: 'Tarte Tatin', quantity: 1, price: 12.00 },
        { dish: 'Vin Blanc', quantity: 1, price: 28.00 }
      ],
      clientId: '3'
    }
  ];

  const filteredSales = sales.filter(sale => {
    const matchesSearch = sale.id.includes(searchTerm) ||
                         sale.items.some(item => item.dish.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const saleDate = new Date(sale.date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    let matchesDate = true;
    if (dateFilter === 'today') {
      matchesDate = saleDate.toDateString() === today.toDateString();
    } else if (dateFilter === 'yesterday') {
      matchesDate = saleDate.toDateString() === yesterday.toDateString();
    } else if (dateFilter === 'week') {
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      matchesDate = saleDate >= weekAgo;
    }
    
    return matchesSearch && matchesDate;
  });

  const getTotalRevenue = () => {
    return filteredSales.reduce((sum, sale) => sum + sale.total, 0);
  };

  const getAverageOrderValue = () => {
    if (filteredSales.length === 0) return 0;
    return getTotalRevenue() / filteredSales.length;
  };

  const getTotalOrders = () => {
    return filteredSales.length;
  };

  const getTopDish = () => {
    const dishCount: { [key: string]: number } = {};
    filteredSales.forEach(sale => {
      sale.items.forEach(item => {
        dishCount[item.dish] = (dishCount[item.dish] || 0) + item.quantity;
      });
    });
    
    const topDish = Object.entries(dishCount).sort(([,a], [,b]) => b - a)[0];
    return topDish ? topDish[0] : 'Aucun';
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Détails des Ventes</h1>
          <p className="text-gray-600">Analysez vos performances commerciales</p>
        </div>
        <button 
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:shadow-md transition-all duration-200"
          style={{ backgroundColor: '#FF8C42' }}
        >
          <Download size={20} />
          Exporter
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Chiffre d'Affaires</p>
              <p className="text-2xl font-bold text-gray-900">€{getTotalRevenue().toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFF7ED' }}>
              <DollarSign size={24} style={{ color: '#FF8C42' }} />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp size={14} className="text-green-500" />
            <span className="text-sm text-green-600">+12% vs hier</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Commandes</p>
              <p className="text-2xl font-bold text-gray-900">{getTotalOrders()}</p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFF9E6' }}>
              <TrendingUp size={24} style={{ color: '#FFB84D' }} />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp size={14} className="text-green-500" />
            <span className="text-sm text-green-600">+8% vs hier</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Panier Moyen</p>
              <p className="text-2xl font-bold text-gray-900">€{getAverageOrderValue().toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FDF2F8' }}>
              <DollarSign size={24} style={{ color: '#F4C2A1' }} />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingDown size={14} className="text-red-500" />
            <span className="text-sm text-red-600">-3% vs hier</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Plat Populaire</p>
              <p className="text-lg font-bold text-gray-900">{getTopDish()}</p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F3E8FF' }}>
              <TrendingUp size={24} style={{ color: '#A67C5A' }} />
            </div>
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
              placeholder="Rechercher une vente..."
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
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: '#F5F1E8' }}>
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">ID Commande</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Date & Heure</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Articles</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Quantité</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Total</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Client</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm font-medium text-gray-900">#{sale.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {new Date(sale.date).toLocaleDateString('fr-FR')}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(sale.date).toLocaleTimeString('fr-FR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {sale.items.slice(0, 2).map((item, index) => (
                        <p key={index} className="text-sm text-gray-700">
                          {item.dish}
                        </p>
                      ))}
                      {sale.items.length > 2 && (
                        <p className="text-xs text-gray-500">
                          +{sale.items.length - 2} autres articles
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">
                      {sale.items.reduce((sum, item) => sum + item.quantity, 0)} articles
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <DollarSign size={14} className="text-gray-400" />
                      <span className="font-bold text-gray-900">{sale.total.toFixed(2)}€</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {sale.clientId ? (
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full text-green-700 bg-green-100">
                        Client fidèle
                      </span>
                    ) : (
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full text-gray-700 bg-gray-100">
                        Client occasionnel
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Affichage de 1 à {filteredSales.length} sur {sales.length} ventes
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

export default SalesList;