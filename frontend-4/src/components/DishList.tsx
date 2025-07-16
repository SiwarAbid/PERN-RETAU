import React, { useEffect, useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, DollarSign, Clock, EyeClosed } from 'lucide-react';
import type { Dish } from '../types/user';
import DataLoadingState from './Loading';
import CrudModal from './CRUDModal';
import DeleteModal from './DeleteModal';

const DishList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
    const [selectedDishes, setSelectedDishes] = useState<number[]>([]);
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
    const [hiddenDishes, setHiddenDishes] = useState<number[]>([]); // IDs masqués
    const [categorieFilter, setCategorieFilter] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('');
  
    useEffect(() => {
      const fetchdishes = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch('http://localhost:5000/dishes', {
            credentials: 'include',
          });
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des dishes');
          }
          const data = await response.json();
          console.log(data);
          // On ne garde que les utilisateurs dont le rôle est 'Dishes'
          setDishes(data);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : 'Erreur inconnue lors du chargement'
          );
        } finally {
          setLoading(false);
        }
      };
      fetchdishes();
    },[]);
  
    // Fonction pour masquer/démasquer un Dishes
    const handleHideDishes = (DishesId: number) => {
      setHiddenDishes((prev) =>
        prev.includes(DishesId)
          ? prev.filter((id) => id !== DishesId) // Démasquer si déjà masqué
          : [...prev, DishesId] // Masquer sinon
      );
    };
  
    const filteredDishes = dishes.filter(dishes => {
      if (statusFilter === 'masqué') {
        // Affiche uniquement les dishes masqués
        return hiddenDishes.includes(dishes.id) &&
          (dishes.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           dishes.category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           dishes.description.toLowerCase().includes(searchTerm.toLowerCase()));
      }
      if (statusFilter === 'unavailable') {
        // Affiche uniquement les dishes actifs non masqués
        return !dishes.isAvailable &&
          !hiddenDishes.includes(dishes.id) &&
          (dishes.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           dishes.category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           dishes.description.toLowerCase().includes(searchTerm.toLowerCase()));
      }
      if (statusFilter === 'available') {
        // Affiche uniquement les dishes inactifs non masqués
        return dishes.isAvailable &&
          !hiddenDishes.includes(dishes.id) &&
          (dishes.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           dishes.category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           dishes.description.toLowerCase().includes(searchTerm.toLowerCase()));
      }
      // Par défaut (tous sauf masqués)
      return !hiddenDishes.includes(dishes.id) &&
        (dishes.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         dishes.category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         dishes.description.toLowerCase().includes(searchTerm.toLowerCase()));
    });
  
    const handleSelectDishes = (dishId: number) => {
      setSelectedDishes(prev =>
        prev.includes(dishId)
          ? prev.filter(id => id !== dishId)
          : [...prev, dishId]
      );
    };
  
    // A corriger ---
      const dishesFields = [
    { name: 'name', label: 'Nom du plat', type: 'text' as const, required: true },
    { name: 'description', label: 'Description', type: 'textarea' as const, required: true, rows: 3 },
    { name: 'price', label: 'Prix (€)', type: 'number' as const, required: true, min: 0, step: 0.01 },
    { 
      name: 'category', 
      label: 'Catégorie', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'Entrées', label: 'Entrées' },
        { value: 'Plats principaux', label: 'Plats principaux' },
        { value: 'Dessert', label: 'Dessert' },
        { value: 'Spécialités', label: 'Spécialités' }
      ]
    },
    { name: 'image', label: 'URL de l\'image', type: 'file' as const },
    { 
      name: 'isAvailable', 
      label: 'Disponibilité', 
      type: 'select' as const, 
      required: false,
      options: [
        { value: true, label: 'Disponible' },
        { value: false, label: 'Indisponible' }
      ]
    }
  ];

    // Ajouter un nouveau Dishes
    const handleAddDish = async (data: Record<string, unknown>) => {
      setLoading(true);
      setError(null);
      try {
        const formData = new FormData();
        formData.append('name', data.name as string);
        formData.append('category', data.category as string);
        formData.append('description', data.description as string);
        formData.append('price', data.price as string);
        formData.append('isAvailable', data.isAvailable as string); // "true" ou "false"
        formData.append('image', data.image as File); // ici file est un objet File (e.target.files[0])
        console.log('Data: ', data)
        const response = await fetch('http://localhost:5000/add-dish', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          console.log(response)
          throw new Error('Erreur lors de l\'ajout du plat');
        }
        const newDish = await response.json();
        setDishes(prev => [...prev, newDish]);
        setShowAddModal(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Erreur inconnue lors de l\'ajout'
        );
      } finally {
        setLoading(false);
      }
    };
  
    // Modifier un Dishes existant
    const handleEditDish = async (data: Record<string, unknown>) => {
      if (!selectedDish) return;
      setLoading(true);
      setError(null);
      try {
        console.log('Hello here frontned Edit Plat !! --- ')
        const response = await fetch(`http://localhost:5000/update-dish/${selectedDish.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error('Erreur lors de la modification du plat');
        }
        const updatedDishes = await response.json();
        setDishes(prev =>
          prev.map(dishes =>
            dishes.id === selectedDish.id ? { ...dishes, ...updatedDishes } : dishes
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
  
    // Supprimer un Dishes
    const handleDeleteDish = async () => {
      if (!selectedDish) return;
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/delete-dish/${selectedDish.id}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Erreur lors de la suppression du plat');
        }
        setDishes(prev => prev.filter(dishes => dishes.id !== selectedDish.id));
        setShowDeleteModal(false);
        setSelectedDish(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Erreur inconnue lors de la suppression'
        );
      } finally {
        setLoading(false);
      }
    };
  
    const openEditModal = (dishes: Dish) => {
      setSelectedDish(dishes);
      setShowEditModal(true);
    };
  
    const openDeleteModal = (dishes: Dish) => {
      setSelectedDish(dishes);
      setShowDeleteModal(true);
    };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Entrées': return '#FF8C42';
      case 'Plats principaux': return '#FFB84D';
      case 'Desserts': return '#F4C2A1';
      case 'Spécialités': return '#A67C5A';
      default: return '#6B7280';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Plats</h1>
          <p className="text-gray-600">Gérez votre menu et vos spécialités</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)} 
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:shadow-md transition-all duration-200"
          style={{ backgroundColor: '#FF8C42' }}
        >
          <Plus size={20} />
          Nouveau Plat
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher un plat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <select 
              value={categorieFilter}
              onChange={(e) => setCategorieFilter(e.target.value)} 
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
            <option value="">Toutes les catégories</option>
            <option value="Entrées">Entrées</option>
            <option value="Plats principaux">Plats principaux</option>
            <option value="Desserts">Desserts</option>
            <option value="Spécialités">Spécialités</option>
          </select>
          <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)} 
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
            <option value="">Tous les statuts</option>
            <option value="available">Disponible</option>
            <option value="unavailable">Indisponible</option>
          </select>
        </div>
      </div>

      {/* Gestion du chargement et des erreurs */}
      {loading && <div className="text-center py-4"><DataLoadingState isLoading={loading} isEmpty={true} hasError={false}/></div>}
      {error && <div className="text-center py-4 text-red-500"><DataLoadingState isLoading={loading} isEmpty={false} hasError={true} errorMessage={error}/></div>}

      {/* Dishes Grid */}
      {!loading && !error && (
        <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {filteredDishes.map((dish) => (
            <div key={dish.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200">
              <div className="relative">
                <img
                  src={`http://localhost:5000/uploads/${dish.image}`}
                  alt={dish.name}
                  className="w-full h-48 object-cover" />
                {!dish.isAvailable && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Clock size={12} />
                    Indisponible
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <span
                    className="inline-flex px-2 py-1 text-xs font-medium rounded-full text-white"
                    style={{ backgroundColor: getCategoryColor(dish.category.name) }}
                  >
                    {dish.category.name}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{dish.name}</h3>
                  <div className="flex items-center gap-1">
                    <DollarSign size={16} className="text-gray-400" />
                    <span className="text-lg font-bold" style={{ color: '#FF8C42' }}>
                      {dish.price.toFixed(2)}€
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{dish.description}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedDishes.includes(dish.id)}
                      onChange={() => handleSelectDishes(dish.id)}
                      className="rounded border-gray-300 focus:ring-orange-500" />
                    <span className={`text-xs font-medium ${dish.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                      {dish.isAvailable ? 'Disponible' : 'Indisponible'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleHideDishes(dish.id)}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      title={hiddenDishes.includes(dish.id) ? "Démasquer" : "Masquer"}
                    >
                      {hiddenDishes.includes(dish.id) ? <EyeClosed /> : <Eye size={16} />}
                    </button>
                    <button onClick={() => openEditModal(dish)} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => openDeleteModal(dish)} className="p-1 text-red-400 hover:text-red-600 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

         {/* Pagination */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Affichage de 1 à {filteredDishes.length} sur {dishes.length} plats
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
      </>)}
       {/* Modals */}
      <CrudModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Ajouter un nouveau plat"
        fields={dishesFields}
        onSubmit={handleAddDish}
      />

      <CrudModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Modifier le plat"
        fields={dishesFields}
        initialData={
          selectedDish
            ? {
                name: selectedDish.name ?? null,
                email: selectedDish ?? null,
                phone: selectedDish ?? null,
                address: selectedDish ?? null,
                status: selectedDish ? 'active' : 'inactive',
              }
            : undefined
        }
        onSubmit={handleEditDish}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Supprimer le client"
        message="Êtes-vous sûr de vouloir supprimer ce plat ?"
        itemName={selectedDish?.name}
        onConfirm={handleDeleteDish}
      />
      </div>
  );
};

export default DishList;