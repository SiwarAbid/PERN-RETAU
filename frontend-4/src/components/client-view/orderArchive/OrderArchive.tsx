import React, { useState, useMemo, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import type { Order, OrderFilters } from './order';
// import { mockOrders } from './mockData'; // Supprimer cette ligne
import { OrderStats } from './OrderStats';
import { OrderFilters as OrderFiltersComponent } from './OrderFilter';
import { OrderCard } from './OrderCard';
import { OrderDetailsModal } from './OrderDetailsModal';
import type { Dish } from '../../../types/user';

export const OrderArchive: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filters, setFilters] = useState<OrderFilters>({});
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

const apiBaseUrl = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
  const user = localStorage.getItem('user');
  const userId = user ? JSON.parse(user).id : null;

  // Récupération des commandes depuis le backend
  useEffect(() => {
    if (!userId) {
      setError('Veuillez vous connecter pour voir vos commandes.');
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`${apiBaseUrl}/orders?userId=${userId}`) // À adapter selon votre route backend
      .then(res => {
        if (!res.ok) throw new Error('Erreur lors du chargement');
        return res.json();
      })
      .then(data => {
        setOrders(data);
      })
      .catch(err => {
        setError(err.message);
      }).finally(() => setLoading(false));
  }, [userId, apiBaseUrl]);

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const itemsMatch = order.items.some(item => {
          const dish = dishes.find(d => d.id === item.dishId);
          return dish ? dish.name.toLowerCase().includes(searchLower) : false;
        });
        if (!order.orderNumber.toLowerCase().includes(searchLower) && !itemsMatch) {
          return false;
        }
      }

      if (filters.status && order.status !== filters.status) {
        return false;
      }

      if (filters.orderType && order.orderType !== filters.orderType) {
        return false;
      }

      if (filters.dateFrom && new Date(order.createdAt) < filters.dateFrom) {
        return false;
      }

      if (filters.dateTo) {
        const dateTo = new Date(filters.dateTo);
        dateTo.setHours(23, 59, 59, 999);
        if (new Date(order.createdAt) > dateTo) {
          return false;
        }
      }

      return true;
    });
  }, [orders, filters]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ordersPerPage;
    return filteredOrders.slice(startIndex, startIndex + ordersPerPage);
  }, [filteredOrders, currentPage]);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleReorder = (order: Order) => {
    // Ici vous pourriez rediriger vers la page de commande avec les articles pré-sélectionnés
    console.log('Reordering:', order);
    alert('Redirection vers la page de commande avec vos articles favoris !');
  };

  const activeOrders = orders.filter(order => ['preparing', 'ready'].includes(order.status));

  const dishes: Dish[] = useMemo(() => {
    try {
      const stored = localStorage.getItem('dishes');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto p-6">
        {!userId && (
          <div className="text-center py-12 text-gray-500">Veuillez vous connecter pour voir vos commandes.</div>
        )}

        {/* Gestion du chargement et des erreurs */}
        {loading && (
          <div className="text-center py-12 text-gray-500">Chargement des commandes...</div>
        )}
        {error && (
          <div className="text-center py-12 text-red-500">Erreur : {error}</div>
        )}

        {!loading && !error && (
          <>
            {/* Notifications pour commandes actives */}
            {activeOrders.length > 0 && (
              <div className="mb-6">
                {activeOrders.map((order) => (
                  <div key={order.id} className="bg-yellow-100 border border-yellow-200 rounded-lg p-4 mb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-yellow-800">
                          Commande {order.orderNumber} - {order.status === 'READY' ? 'Prête !' : 'En préparation'}
                        </h3>
                        <p className="text-sm text-yellow-700">
                          {order.completedAt && (
                            <>
                              {order.status === 'READY' ? 'Prête depuis' : 'Prête vers'} {' '}
                              {new Date(order.completedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                            </>
                          )}
                        </p>
                      </div>
                      <button
                        onClick={() => handleViewDetails(order)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200"
                      >
                        Voir détails
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Statistiques */}
            <OrderStats orders={filteredOrders} />

            {/* Filtres */}
            <OrderFiltersComponent filters={filters} onFiltersChange={setFilters} />

            {/* Liste des commandes */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Historique ({filteredOrders.length})
                </h2>
                <div className="text-sm text-gray-600">
                  Page {currentPage} sur {totalPages}
                </div>
              </div>

              {paginatedOrders.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-12 text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucune commande trouvée</h3>
                  <p className="text-gray-500">Ajustez vos filtres ou passez votre première commande !</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onViewDetails={handleViewDetails}
                      onReorder={handleReorder}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Précédent
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                      page === currentPage
                        ? 'bg-orange-500 text-white'
                        : 'border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Suivant
                </button>
              </div>
            )}

            {/* Modal des détails */}
            <OrderDetailsModal
              order={selectedOrder}
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setSelectedOrder(null);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};