import React, { useState } from 'react';
import { User, Save } from 'lucide-react';
import type { User as UserType } from '../../../types/accueil';
import { useMessageAlert } from '../../../hooks/useMessage';

export default function CustomerForm() {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) as UserType : null;
  const [updateUser, setUpdateUser] = useState<UserType | null>(user);
  const [notify, setNotify] = useState(false);
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [showPasswordCard, setShowPasswordCard] = useState(false);
  const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
  const { alert: alertMessage } = useMessageAlert();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUpdateUser((prev) => prev ? { ...prev, image: URL.createObjectURL(e.target.files![0]) } : null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (updateUser?.name) formData.append('name', updateUser.name);
    if (updateUser?.email) formData.append('email', updateUser.email);
    if (updateUser?.phone) formData.append('phone', updateUser.phone);
    if (updateUser?.address) formData.append('address', updateUser.address);
    if (notify) formData.append('notify', 'true');

    // Ajout de l'image si sélectionnée
    const imageInput = document.getElementById('image') as HTMLInputElement;
    if (imageInput && imageInput.files && imageInput.files[0]) {
      formData.append('image', imageInput.files[0]);
    }

    // Ajout du mot de passe si modification
    if (showPasswordCard && password) {
      formData.append('oldPassword', oldPassword);
      formData.append('password', password);
    }

    try {
      const response = await fetch(`${apiBase}/update-user/${user?.id}`, {
        method: 'PUT',
        body: formData,
        credentials: 'include', // si besoin d'authentification
      });

      if (response.ok) {
        // Succès : afficher une notification ou mettre à jour le localStorage
        alertMessage({typeMsg:'success',messageContent:'Profil mis à jour avec succès'});
        localStorage.setItem('user', JSON.stringify(updateUser));
        setUpdateUser(null);
        setShowPasswordCard(false);
        setPassword('');
        setOldPassword('');
      } else {
        // Erreur : afficher un message d'erreur
        const error = await response.json();
        alertMessage({typeMsg:'error',messageContent: error.message || 'Erreur lors de la mise à jour'});
      }
    } catch (err) {
      console.error('Erreur lors de la mise à jour du profil:', err);
    }
  };

  return (
    <div className="bg-white pb-20 rounded-2xl shadow-lg p-6 border border-orange-100 w-2xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-orange-100 p-3 rounded-full">
          <User className="w-6 h-6 text-orange-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800">Informations Client</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Champ image */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
            Image de profil
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 outline-none"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nom Complet
          </label>
          <input
            type="text"
            id="name"
            value={updateUser?.name || ''}
            onChange={(e) => setUpdateUser((prev) => prev ? { ...prev, name: e.target.value } : null)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 outline-none"
            placeholder="Votre nom complet"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={updateUser?.email || ''}
            onChange={(e) => setUpdateUser((prev) => prev ? { ...prev, email: e.target.value } : null)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 outline-none"
            placeholder="Votre email"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Téléphone
          </label>
          <input
            type="tel"
            id="phone"
            value={updateUser?.phone || ''}
            onChange={(e) => setUpdateUser((prev) => prev ? { ...prev, phone: e.target.value } : null)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 outline-none"
            placeholder="Votre numéro de téléphone"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Adresse
          </label>
          <input
            type="text"
            id="address"
            value={updateUser?.address || ''}
            onChange={(e) => setUpdateUser((prev) => prev ? { ...prev, address: e.target.value } : null)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 outline-none"
            placeholder="Votre adresse"
          />
        </div>

        {/* Case à cocher notification */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="notify"
            checked={notify}
            onChange={() => setNotify(!notify)}
            className="mr-2"
          />
          <label htmlFor="notify" className="text-sm text-gray-700">
            Me notifier par mail lors de modification
          </label>
        </div>
        {/* Carte modification mot de passe */}
        <div className="my-4">
          <button
            type="button"
            onClick={() => setShowPasswordCard(!showPasswordCard)}
            className="bg-orange-100 text-orange-700 px-4 py-2 rounded-xl font-semibold"
          >
            Modifier le mot de passe
          </button>
          {showPasswordCard && (
            <div className="mt-4 p-4 border rounded-xl bg-orange-50">
              <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Ancien mot de passe
              </label>
              <input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 outline-none mb-4"
                placeholder="Votre ancien mot de passe"
              />
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 outline-none"
                placeholder="Votre nouveau mot de passe"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <div className="flex items-center justify-center space-x-2">
            <Save className="w-5 h-5" />
            <span>Enregistrer</span>
          </div>
        </button>
      </form>
    </div>
  );
}