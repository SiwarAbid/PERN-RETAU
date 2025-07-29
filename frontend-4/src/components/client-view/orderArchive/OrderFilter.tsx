import React from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import type { OrderFilters as OrderFiltersType } from './order';

interface OrderFiltersProps {
  filters: OrderFiltersType;
  onFiltersChange: (filters: OrderFiltersType) => void;
}

export const OrderFilters: React.FC<OrderFiltersProps> = ({ filters, onFiltersChange }) => {
  const handleFilterChange = (key: keyof OrderFiltersType, value: string | Date | undefined) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-semibold text-gray-800">Filtrer mes commandes</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Recherche */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un plat..."
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        {/* Statut */}
        <select
          value={filters.status || ''}
          onChange={(e) => handleFilterChange('status', e.target.value || undefined)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="">Tous les statuts</option>
          <option value="preparing">En préparation</option>
          <option value="ready">Prête</option>
          <option value="completed">Livrée</option>
          <option value="cancelled">Annulée</option>
        </select>

        {/* Type de commande */}
        <select
          value={filters.orderType || ''}
          onChange={(e) => handleFilterChange('orderType', e.target.value || undefined)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="">Tous les types</option>
          <option value="dine-in">Sur place</option>
          <option value="takeaway">À emporter</option>
          <option value="delivery">Livraison</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Date de début */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="date"
            placeholder="Date de début"
            value={filters.dateFrom ? filters.dateFrom.toISOString().split('T')[0] : ''}
            onChange={(e) => handleFilterChange('dateFrom', e.target.value ? new Date(e.target.value) : undefined)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        {/* Date de fin */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="date"
            placeholder="Date de fin"
            value={filters.dateTo ? filters.dateTo.toISOString().split('T')[0] : ''}
            onChange={(e) => handleFilterChange('dateTo', e.target.value ? new Date(e.target.value) : undefined)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};