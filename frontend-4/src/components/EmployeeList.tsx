import React, { useEffect, useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, Phone, Mail, Calendar, DollarSign, EyeClosed } from 'lucide-react';
import type { User } from '../types/user';
import CrudModal from './CRUDModal';
import DeleteModal from './DeleteModal';
import DataLoadingState from './Loading';

const EmployeeList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [employees, setEmployees] = useState<User[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [hiddenEmployees, setHiddenEmployees] = useState<number[]>([]); // IDs masqués
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('');

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/users?role=EMPLOYEE', {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des employees');
        }
        const data = await response.json();
        console.log(data);
        // On ne garde que les utilisateurs dont le rôle est 'employee'
        setEmployees(data.employees);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Erreur inconnue lors du chargement'
        );
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  },[]);

  // Fonction pour masquer/démasquer un employee
  const handleHideEmployees = (employeeId: number) => {
    setHiddenEmployees((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId) // Démasquer si déjà masqué
        : [...prev, employeeId] // Masquer sinon
    );
  };
  const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null);

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = departmentFilter === '' || employee.role === departmentFilter;

    if (statusFilter === 'masqué') {
      // Affiche uniquement les employee masqués
      return hiddenEmployees.includes(employee.id) && matchesSearch && matchesDepartment;
    }
    if (statusFilter === 'active') { 
      // Affiche uniquement les employee actifs non masqués
      return employee.isActived &&
        !hiddenEmployees.includes(employee.id) && matchesSearch && matchesDepartment;
    }
    if (statusFilter === 'inactive') { // retraite
      // Affiche uniquement les employee inactifs non masqués
      return !employee.isActived &&
        !hiddenEmployees.includes(employee.id) && matchesSearch && matchesDepartment;
    }
    // Par défaut (tous sauf masqués)
    return matchesSearch && matchesDepartment;
  });

  const handleSelectEmployee = (employeeId: number) => {
    setSelectedEmployees(prev =>
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'kitchen': return '#FF8C42';
      case 'service': return '#FFB84D';
      case 'management': return '#A67C5A';
      case 'cleaning': return '#F4C2A1';
      default: return '#6B7280';
    }
  };

  const getDepartmentLabel = (department: string) => {
    switch (department) {
      case 'kitchen': return 'Cuisine';
      case 'service': return 'Service';
      case 'management': return 'Direction';
      case 'cleaning': return 'Entretien';
      default: return department;
    }
  };

  const employeeFields = [
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
    },
    {
      name: 'role',
      label: 'Poste',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'CHEF', label: 'Chef de Cuisine' },
        { value: 'SOUS CHEF', label: 'Sous chef de Cuisine' },
        { value: 'SERVER', label: 'Server' },
        { value: 'ADMIN', label: 'Manager' },
        { value: 'AGENT', label: 'Agent polyvalent ' }
      ]
    },
    {
      name: 'salary',
      label: 'Salaire',
      type: 'number' as const,
      required: true,
      min: 0,
      step: 10
    },
    {
      name: 'dateEmbauche',
      label: 'Date d\'embauche',
      type: 'date' as const,
      required: true
    },
  ];

  // Ajouter un nouveau employee
  const handleAddEmployee = async (data: Record<string, unknown>) => {
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
        throw new Error('Erreur lors de l\'ajout du employee');
      }
      const newEmployee = await response.json();
      setEmployees(prev => [...prev, newEmployee]);
      setShowAddModal(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erreur inconnue lors de l\'ajout'
      );
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un employee
  const handleDeleteEmployee = async () => {
    if (!selectedEmployee) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/delete-user/${selectedEmployee.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du employee');
      }
      setEmployees(prev => prev.filter(employee => employee.id !== selectedEmployee.id));
      setShowDeleteModal(false);
      setSelectedEmployee(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erreur inconnue lors de la suppression'
      );
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (employee: User) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  const openDeleteModal = (employee: User) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };

  // Modifier un employee existant
  const handleEditEmployee = async (data: Record<string, unknown>) => {
    if (!selectedEmployee) return;
    setLoading(true);
    setError(null);
    console.log('selectedEmployee', selectedEmployee)
    try {
      console.log('Hello here frontned Edit Client !! --- ')
      const response = await fetch(`http://localhost:5000/update-user/${selectedEmployee.id}`, {
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
      const updatedEmployee = await response.json();
      setEmployees(prev =>
        prev.map(employee =>
          employee.id === selectedEmployee.id ? { ...employee, ...updatedEmployee } : employee
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

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Employés</h1>
          <p className="text-gray-600">Gérez votre équipe et leurs informations</p>
        </div>
        <button 
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:shadow-md transition-all duration-200"
          style={{ backgroundColor: '#FF8C42' }}
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={20} />
          Nouvel Employé
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher un employé..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
            <option value="">Tous les départements</option>
            <option value="kitchen">Cuisine</option>
            <option value="service">Service</option>
            <option value="management">Direction</option>
            <option value="cleaning">Polyvalant</option>
          </select> 
          <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
            <option value="">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
            <option value="masqué">Masqué</option>
          </select>
        </div>
      </div>

      {/* Gestion du chargement et des erreurs */}
      {loading && <div className="text-center py-4"><DataLoadingState isLoading={loading} isEmpty={true} hasError={false}/></div>}
      {error && <div className="text-center py-4 text-red-500"><DataLoadingState isLoading={loading} isEmpty={false} hasError={true} errorMessage={error}/></div>}

      {/* Employees Table */}
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
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Employé</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Poste</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Département</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Salaire</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Date d'embauche</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Statut</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedEmployees.includes(employee.id)}
                      onChange={() => handleSelectEmployee(employee.id)}
                      className="rounded border-gray-300 focus:ring-orange-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{employee.name}</p>
                      <p className="text-sm text-gray-600">{employee.role}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail size={14} />
                        {employee.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone size={14} />
                        {employee.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{employee.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span 
                      className="inline-flex px-2 py-1 text-xs font-medium rounded-full text-white"
                      style={{ backgroundColor: getDepartmentColor(employee.role) }}
                    >
                      {getDepartmentLabel(employee.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1"> 
                      <DollarSign size={14} className="text-gray-400" /> 
                      <span className="font-medium text-gray-900">{employee.salary ? `${employee.salary.toLocaleString()}€` : '-'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar size={14} />
                      {employee.dateEmbauche 
                      ? new Date(employee.dateEmbauche).toLocaleDateString('fr-FR')
                      : '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      employee.isActived
                        ? 'text-green-700 bg-green-100'
                        : 'text-gray-700 bg-gray-100'
                    }`}>
                      {employee.isActived ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleHideEmployees(employee.id)} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        {hiddenEmployees.includes(employee.id) ? <EyeClosed /> : <Eye size={16} />}                      </button>
                      <button onClick={() => openEditModal(employee)} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => openDeleteModal(employee)} className="p-1 text-red-400 hover:text-red-600 transition-colors">
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
            Affichage de 1 à {filteredEmployees.length} sur {employees.length} employés
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
        title="Ajouter un nouvel employé"
        fields={employeeFields}
        onSubmit={handleAddEmployee}
      />

      <CrudModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Modifier l'employé"
        fields={employeeFields}
        initialData={
          selectedEmployee
            ? { ...selectedEmployee, role: selectedEmployee.role }
            : undefined
        }
        onSubmit={handleEditEmployee}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Supprimer l'employé"
        message="Êtes-vous sûr de vouloir supprimer cet employé ?"
        itemName={selectedEmployee?.name}
        onConfirm={handleDeleteEmployee}
      />
    </div>
  );
};

export default EmployeeList;