import React, { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, Phone, Mail, Calendar, DollarSign } from 'lucide-react';
import type { Employee } from '../types/user';

const EmployeeList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  // Mock data
  const employees: Employee[] = [
    {
      id: '1',
      name: 'Pierre Dupont',
      email: 'pierre.dupont@restaurant.com',
      phone: '01 23 45 67 89',
      position: 'Chef Exécutif',
      salary: 4500,
      hireDate: '2022-03-15',
      status: 'active',
      department: 'kitchen'
    },
    {
      id: '2',
      name: 'Marie Leroy',
      email: 'marie.leroy@restaurant.com',
      phone: '01 98 76 54 32',
      position: 'Serveuse Senior',
      salary: 2800,
      hireDate: '2023-01-10',
      status: 'active',
      department: 'service'
    },
    {
      id: '3',
      name: 'Antoine Bernard',
      email: 'antoine.bernard@restaurant.com',
      phone: '01 11 22 33 44',
      position: 'Sous-Chef',
      salary: 3200,
      hireDate: '2022-08-20',
      status: 'active',
      department: 'kitchen'
    },
    {
      id: '4',
      name: 'Sophie Martin',
      email: 'sophie.martin@restaurant.com',
      phone: '01 55 66 77 88',
      position: 'Manager',
      salary: 3800,
      hireDate: '2021-11-05',
      status: 'active',
      department: 'management'
    }
  ];

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectEmployee = (employeeId: string) => {
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
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
            <option value="">Tous les départements</option>
            <option value="kitchen">Cuisine</option>
            <option value="service">Service</option>
            <option value="management">Direction</option>
            <option value="cleaning">Entretien</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
            <option value="">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
        </div>
      </div>

      {/* Employees Table */}
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
                      <p className="text-sm text-gray-600">{employee.position}</p>
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
                    <span className="font-medium text-gray-900">{employee.position}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span 
                      className="inline-flex px-2 py-1 text-xs font-medium rounded-full text-white"
                      style={{ backgroundColor: getDepartmentColor(employee.department) }}
                    >
                      {getDepartmentLabel(employee.department)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <DollarSign size={14} className="text-gray-400" />
                      <span className="font-medium text-gray-900">{employee.salary.toLocaleString()}€</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar size={14} />
                      {new Date(employee.hireDate).toLocaleDateString('fr-FR')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      employee.status === 'active'
                        ? 'text-green-700 bg-green-100'
                        : 'text-gray-700 bg-gray-100'
                    }`}>
                      {employee.status === 'active' ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-1 text-red-400 hover:text-red-600 transition-colors">
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
    </div>
  );
};

export default EmployeeList;