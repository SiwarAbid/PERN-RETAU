import React, { useState } from 'react';
import { Search, Plus, Mail, MailOpen, Reply, Archive, Trash2, User, Clock } from 'lucide-react';
import type { Message } from '../types/user';

const MessageList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [filter, setFilter] = useState('all');

  // Mock data
  const messages: Message[] = [
    {
      id: '1',
      from: 'marie.dubois@email.com',
      to: 'contact@restaurant.com',
      subject: 'Réservation pour anniversaire',
      content: 'Bonjour, je souhaiterais réserver une table pour 8 personnes le samedi 20 janvier pour fêter un anniversaire. Avez-vous une salle privée disponible ? Merci.',
      timestamp: '2024-01-15T14:30:00',
      read: false
    },
    {
      id: '2',
      from: 'jean.martin@email.com',
      to: 'contact@restaurant.com',
      subject: 'Compliments pour le service',
      content: 'Bonsoir, je tenais à vous féliciter pour l\'excellent service de ce soir. Notre serveur était parfait et les plats délicieux. Nous reviendrons très bientôt !',
      timestamp: '2024-01-15T21:45:00',
      read: true
    },
    {
      id: '3',
      from: 'sophie.laurent@email.com',
      to: 'contact@restaurant.com',
      subject: 'Question sur les allergènes',
      content: 'Bonjour, ma fille est allergique aux fruits à coque. Pourriez-vous me dire quels plats de votre menu sont sans danger pour elle ? Merci d\'avance.',
      timestamp: '2024-01-14T16:20:00',
      read: false
    },
    {
      id: '4',
      from: 'pierre.durand@email.com',
      to: 'contact@restaurant.com',
      subject: 'Demande de devis pour événement',
      content: 'Bonjour, nous organisons un événement d\'entreprise pour 50 personnes. Pourriez-vous nous faire un devis pour un cocktail dînatoire ? Date souhaitée : 15 février.',
      timestamp: '2024-01-14T10:15:00',
      read: true
    },
    {
      id: '5',
      from: 'isabelle.moreau@email.com',
      to: 'contact@restaurant.com',
      subject: 'Réclamation commande à emporter',
      content: 'Bonsoir, j\'ai commandé ce midi et il manquait un dessert dans ma commande. Pouvez-vous me dire comment procéder pour un remboursement ? Commande #1234.',
      timestamp: '2024-01-13T13:30:00',
      read: false
    }
  ];

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = true;
    if (filter === 'unread') {
      matchesFilter = !message.read;
    } else if (filter === 'read') {
      matchesFilter = message.read;
    }
    
    return matchesSearch && matchesFilter;
  });

  const handleSelectMessage = (messageId: string) => {
    setSelectedMessages(prev =>
      prev.includes(messageId)
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    );
  };

  const getUnreadCount = () => {
    return messages.filter(message => !message.read).length;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
    }
  };

  const getPriorityColor = (subject: string) => {
    if (subject.toLowerCase().includes('réclamation') || subject.toLowerCase().includes('problème')) {
      return '#EF4444'; // Rouge pour urgent
    } else if (subject.toLowerCase().includes('réservation') || subject.toLowerCase().includes('devis')) {
      return '#F59E0B'; // Orange pour important
    }
    return '#6B7280'; // Gris pour normal
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messagerie</h1>
          <p className="text-gray-600">Gérez vos communications avec les clients</p>
        </div>
        <button 
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:shadow-md transition-all duration-200"
          style={{ backgroundColor: '#FF8C42' }}
        >
          <Plus size={20} />
          Nouveau Message
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Messages</p>
              <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
            </div>
            <Mail size={24} style={{ color: '#FF8C42' }} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Non Lus</p>
              <p className="text-2xl font-bold text-gray-900">{getUnreadCount()}</p>
            </div>
            <MailOpen size={24} style={{ color: '#FFB84D' }} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Aujourd'hui</p>
              <p className="text-2xl font-bold text-gray-900">
                {messages.filter(m => new Date(m.timestamp).toDateString() === new Date().toDateString()).length}
              </p>
            </div>
            <Clock size={24} style={{ color: '#F4C2A1' }} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taux de Réponse</p>
              <p className="text-2xl font-bold text-gray-900">94%</p>
            </div>
            <Reply size={24} style={{ color: '#A67C5A' }} />
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
              placeholder="Rechercher dans les messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">Tous les messages</option>
            <option value="unread">Non lus</option>
            <option value="read">Lus</option>
          </select>
        </div>
      </div>

      {/* Messages List */}
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
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Statut</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Expéditeur</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Sujet</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Aperçu</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMessages.map((message) => (
                <tr key={message.id} className={`hover:bg-gray-50 ${!message.read ? 'bg-blue-50' : ''}`}>
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedMessages.includes(message.id)}
                      onChange={() => handleSelectMessage(message.id)}
                      className="rounded border-gray-300 focus:ring-orange-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {message.read ? (
                        <MailOpen size={16} className="text-gray-400" />
                      ) : (
                        <Mail size={16} className="text-blue-500" />
                      )}
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getPriorityColor(message.subject) }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F5F1E8' }}>
                        <User size={16} style={{ color: '#A67C5A' }} />
                      </div>
                      <div>
                        <p className={`text-sm ${!message.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                          {message.from.split('@')[0]}
                        </p>
                        <p className="text-xs text-gray-500">{message.from}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className={`text-sm ${!message.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                      {message.subject}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 truncate max-w-xs">
                      {message.content}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock size={14} />
                      {formatTimestamp(message.timestamp)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <Reply size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <Archive size={16} />
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
            Affichage de 1 à {filteredMessages.length} sur {messages.length} messages
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

export default MessageList;