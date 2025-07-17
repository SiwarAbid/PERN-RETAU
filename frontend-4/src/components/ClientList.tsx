import React, { useState, useEffect } from 'react';
import { Search, Plus, Eye, Edit, Trash2, Phone, Mail, EyeClosed } from 'lucide-react';
import type { User } from '../types/user';
import DataLoadingState from './Loading';
import CrudModal from './CRUDModal';
import DeleteModal from './DeleteModal';

const ClientList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  const [clients, setClients] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<User | null>(null);
  const [hiddenClients, setHiddenClients] = useState<number[]>([]); // IDs masqués
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/users?role=CLIENT', {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des clients');
        }
        const data = await response.json();
        console.log(data);
        // On ne garde que les utilisateurs dont le rôle est 'CLIENT'
        setClients(data.clients);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Erreur inconnue lors du chargement'
        );
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  },[]);

  // Fonction pour masquer/démasquer un client
  const handleHideClient = (clientId: number) => {
    setHiddenClients((prev) =>
      prev.includes(clientId)
        ? prev.filter((id) => id !== clientId) // Démasquer si déjà masqué
        : [...prev, clientId] // Masquer sinon
    );
  };

  const filteredClients = clients.filter(client => {
    if (statusFilter === 'masqué') {
      // Affiche uniquement les clients masqués
      return hiddenClients.includes(client.id) &&
        (client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         client.email.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (statusFilter === 'active') {
      // Affiche uniquement les clients actifs non masqués
      return client.isActived &&
        !hiddenClients.includes(client.id) &&
        (client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         client.email.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (statusFilter === 'inactive') {
      // Affiche uniquement les clients inactifs non masqués
      return !client.isActived &&
        !hiddenClients.includes(client.id) &&
        (client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         client.email.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    // Par défaut (tous sauf masqués)
    return !hiddenClients.includes(client.id) &&
      (client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       client.email.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  const handleSelectClient = (clientId: number) => {
    setSelectedClients(prev =>
      prev.includes(clientId)
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  const clientFields = [
    { name: 'name', label: 'Nom complet', type: 'text' as const, required: true },
    { name: 'email', label: 'Email', type: 'email' as const, required: true },
    { name: 'phone', label: 'Téléphone', type: 'tel' as const, required: true },
    { name: 'address', label: 'Adresse', type: 'textarea' as const, required: true, rows: 3 },
    { 
      name: 'isActived', 
      label: 'Statut', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: true, label: 'Actif' },
        { value: false, label: 'Inactif' }
      ]
    }
  ];

  // Ajouter un nouveau client
  const handleAddClient = async (data: Record<string, unknown>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ ...data }),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout du client');
      }
      const newClient = await response.json();
      setClients(prev => [...prev, newClient]);
      setShowAddModal(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erreur inconnue lors de l\'ajout'
      );
    } finally {
      setLoading(false);
    }
  };

  // Modifier un client existant
  const handleEditClient = async (data: Record<string, unknown>) => {
    if (!selectedClient) return;
    setLoading(true);
    setError(null);
    try {
      console.log('Hello here frontned Edit Client !! --- ')
      const response = await fetch(`http://localhost:5000/update-user/${selectedClient.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la modification du client');
      }
      const updatedClient = await response.json();
      setClients(prev =>
        prev.map(client =>
          client.id === selectedClient.id ? { ...client, ...updatedClient } : client
        )
      );
      setShowEditModal(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erreur inconnue lors de la modification'
      );
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un client
  const handleDeleteClient = async () => {
    if (!selectedClient) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/delete-user/${selectedClient.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du client');
      }
      setClients(prev => prev.filter(client => client.id !== selectedClient.id));
      setShowDeleteModal(false);
      setSelectedClient(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erreur inconnue lors de la suppression'
      );
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (client: User) => {
    setSelectedClient(client);
    setShowEditModal(true);
  };

  const openDeleteModal = (client: User) => {
    setSelectedClient(client);
    setShowDeleteModal(true);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Clients</h1>
          <p className="text-gray-600">Gérez vos clients et leur historique</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:shadow-md transition-all duration-200"
          style={{ backgroundColor: '#FF8C42' }}
        >
          <Plus size={20} />
          Nouveau Client
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher un client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <select   
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Tous</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
            <option value="masqué">Masqué</option>
          </select>
        </div>
      </div>

      {/* Gestion du chargement et des erreurs */}
      {loading && <div className="text-center py-4"><DataLoadingState isLoading={loading} isEmpty={true} hasError={false}/></div>}
      {error && <div className="text-center py-4 text-red-500"><DataLoadingState isLoading={loading} isEmpty={false} hasError={true} errorMessage={error}/></div>}

      {/* Clients Table */}
      {!loading && !error && (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: '#F5F1E8' }}>
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 focus:ring-orange-500"
                  />
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Client</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Commandes</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Total Dépensé</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Dernière Visite</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Statut</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id}>
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedClients.includes(client.id)}
                      onChange={() => handleSelectClient(client.id)}
                      className="rounded border-gray-300 focus:ring-orange-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{client.name}</p>
                      <p className="text-sm text-gray-600">{client.address}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail size={14} />
                        {client.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone size={14} />
                        {client.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{/* À remplacer par la donnée réelle si dispo */}-</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{/* À remplacer par la donnée réelle si dispo */}-</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{client.lastVisit ? new Date(client.lastVisit).toLocaleDateString('fr-FR') : '-'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      client.isActived
                        ? 'text-green-700 bg-green-100'
                        : 'text-gray-700 bg-gray-100'
                    }`}>
                      {client.isActived ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleHideClient(client.id)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        title={hiddenClients.includes(client.id) ? "Démasquer" : "Masquer"}
                      >
                        {hiddenClients.includes(client.id) ? <EyeClosed /> : <Eye size={16} />}
                      </button>
                      <button onClick={() => openEditModal(client)} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => openDeleteModal(client)} className="p-1 text-red-400 hover:text-red-600 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Affichage de 1 à {filteredClients.length} sur {clients.length} clients
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
      )}
       {/* Modals */}
      <CrudModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Ajouter un nouveau client"
        fields={clientFields}
        onSubmit={handleAddClient}
      />

      <CrudModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Modifier le client"
        fields={clientFields}
        initialData={
          selectedClient
            ? {
                name: selectedClient.name ?? null,
                email: selectedClient.email ?? null,
                phone: selectedClient.phone ?? null,
                address: selectedClient.address ?? null,
                status: selectedClient.isActived ? 'active' : 'inactive',
              }
            : undefined
        }
        onSubmit={handleEditClient}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Supprimer le client"
        message="Êtes-vous sûr de vouloir supprimer ce client ?"
        itemName={selectedClient?.name}
        onConfirm={handleDeleteClient}
      />
    </div>
  );
};

export default ClientList;