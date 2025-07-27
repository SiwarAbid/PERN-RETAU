import React, { useState } from 'react';
import { ChefHat, AlertCircle } from 'lucide-react';
import type { AuthError } from '../types/auth';
import { useNavigate } from 'react-router-dom';


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<AuthError | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

      try {
        localStorage.clear();

        const endpoint = 'http://localhost:5000/auth/login'

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
          credentials: 'include'
        });

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
          throw new Error(data.message || "Une erreur est survenue");
        }

        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('user', JSON.stringify(data.user));
      
          if (data.user.role == 'ADMIN')
            navigate('/admin')
          else throw new Error("Your token is invalid")
          return true;
        } else {
          throw new Error("Réponse inattendue du serveur");
        }
      } catch (err) {
        setError({
          message: err instanceof Error ? err.message : "Une erreur est survenue",
          field: 'general'
        });
        return false;
      } finally {
        setLoading(false);
      }
    }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F5F1E8' }}>
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div 
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
              style={{ backgroundColor: '#FF8C42' }}
            >
              <ChefHat size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Administration Restaurant</h1>
            <p className="text-gray-600 mt-2">Connectez-vous à votre espace administrateur</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-3 p-4 text-red-700 bg-red-50 rounded-lg border border-red-200">
                <AlertCircle size={20} />
                <span>{error.message}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse e-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                placeholder="admin@restaurant.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
              style={{ backgroundColor: loading ? '#FFB84D' : '#FF8C42' }}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Identifiants de démonstration :</p>
            <p className="text-sm font-mono text-gray-800">Email: admin@restaurant.com</p>
            <p className="text-sm font-mono text-gray-800">Mot de passe: admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;