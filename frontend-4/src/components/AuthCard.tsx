import React, { useState, useCallback } from 'react';
import { Mail, Lock, Eye, EyeOff, ChefHat, Sparkles } from 'lucide-react';
import type { AuthFormData, AuthError, AuthMode, SocialProvider } from '../types/auth';
import { useNavigate } from 'react-router-dom';

interface AuthCardProps {
  isDark: boolean;
}

const AuthCard: React.FC<AuthCardProps> = ({ isDark }) => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AuthError | null>(null);

  const navigate = useNavigate();

  const socialProviders: SocialProvider[] = [
    { 
      name: 'Google', 
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      ),
      color: 'hover:bg-blue-50 hover:border-blue-200'
    },
    { 
      name: 'Facebook', 
      icon: (
        <svg className="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      color: 'hover:bg-blue-50 hover:border-blue-200'
    },
    { 
      name: 'Apple', 
      icon: (
        <svg className="w-4 h-4" fill="#000000" viewBox="0 0 24 24">
          <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
        </svg>
      ),
      color: 'hover:bg-gray-50 hover:border-gray-200'
    },
  ];

  const handleInputChange = useCallback((field: keyof AuthFormData) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({
        ...prev,
        [field]: e.target.value
      }));
      // Clear error when user starts typing
      if (error) setError(null);
    }, [error]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

      try {
      const endpoint = authMode === 'login'
        ? 'http://localhost:5000/auth/login'
        : 'http://localhost:5000/auth/register';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue");
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        alert('Bienvenue dans notre cuisine ! 👨‍🍳');
        if ( localStorage.getItem('token') === data.token && data.role == 'CLIENT')
          navigate(`/accueil`);
        else throw new Error("Your token is invalid")
        // Rediriger ou mettre à jour le contexte utilisateur ici si besoin
      } else {
        throw new Error("Réponse inattendue du serveur");
      }
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Une erreur est survenue",
        field: 'general'
      });
    } finally {
      setIsLoading(false);
    }
  }, [authMode, formData, navigate]);
    const handleSocialLogin = useCallback(async (provider: SocialProvider['name']) => {
    console.log(`Connexion avec ${provider}`);
    console.log(JSON.stringify({formData, provider}))
    // Logique de connexion sociale ici
    const popup: Window | null = window.open(
      `http://localhost:5000/auth/${provider.toLowerCase()}/${authMode}`,
      'oauthPopup',
      'width=500,height=600'
    );

    
    if (!popup) return;
    // Écoute les messages du backend (via postMessage)
    const messageListener = (event: MessageEvent) => {
      console.log('Message reçu :', event);
      if (event.origin !== 'http://localhost:5000') return;
      if (!event.data.success) {
        setError({
          message: event.data.message,
          field: 'general'
        });      
        console.log('Erreur de connexion : ', event.data.message);
        return;
        }
      const { token, user } = event.data;
      console.log('Token reçu :', token);
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        if (popup instanceof Window) {
          popup.close();
        }
        window.removeEventListener('message', messageListener);
        // alert('Bienvenue dans notre cuisine ! 👨‍🍳');
        console.log(localStorage.getItem('token') === token && user.role == 'CLIENT')
        if ( localStorage.getItem('token') === token && user.role == 'CLIENT')
          navigate(`/accueil`);
        else throw new Error("Your token is invalid");
      }
    };
    window.addEventListener('message', messageListener);
  }, [authMode, formData, navigate]);

  const handleGuestAccess = useCallback(() => {
    console.log('Accès invité');
    navigate('/accueil')
  }, [navigate]);

  const toggleAuthMode = useCallback(() => {
    setAuthMode(prev => prev === 'login' ? 'register' : 'login');
    setError(null);
    setFormData({ email: '', password: '' });
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const isLogin = authMode === 'login';

  return (
    <div className={`relative z-10 w-full max-w-md mx-auto p-5 rounded-3xl shadow-2xl backdrop-blur-sm transition-all duration-500 ${
      isDark 
        ? 'bg-[#000000]/50 border border-[#f8bb4c]/30' 
        : 'bg-[#fef6e5]/80 border border-[#f9d1b8]/50'
    }`}>
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#f8971b] to-[#f8bb4c] mb-3 shadow-lg">
          <ChefHat className="w-6 h-6 text-white" />
        </div>
        <h1 className={`text-2xl font-bold mb-1 ${isDark ? 'text-[#fef6e5]' : 'text-[#9f754c]'}`}>
          {isLogin ? 'Bon retour !' : 'Rejoins-nous !'}
        </h1>
        <p className={`text-xs ${isDark ? 'text-[#f9d1b8]' : 'text-[#9f754c]/70'}`}>
          {isLogin ? 'Prêt pour de nouvelles saveurs ?' : 'Une expérience unique t\'attend'}
        </p>
      </div>

      {/* Accès invité rapide */}
      <button 
        onClick={handleGuestAccess}
        className="w-full mb-4 p-2.5 rounded-2xl bg-gradient-to-r from-[#f8bb4c] to-[#f8971b] text-white text-sm font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
      >
        <Sparkles className="w-4 h-4" />
        Goûter rapidement (Invité)
      </button>

      {/* Boutons sociaux */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {socialProviders.map((social) => (
          <button
            key={social.name}
            onClick={() => handleSocialLogin(social.name)}
            className={`p-2.5 rounded-xl border-2 border-[#f9d1b8] ${social.color} transition-all duration-300 hover:scale-105 hover:shadow-md flex items-center justify-center`}
            title={`Se connecter avec ${social.name}`}
            type="button"
          >
            {social.icon}
          </button>
        ))}
      </div>

      <div className="relative mb-4">
        <div className="absolute inset-0 flex items-center">
          <div className={`w-full border-t ${isDark ? 'border-[#f9d1b8]/30' : 'border-[#9f754c]/20'}`}></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className={`px-3 ${isDark ? 'bg-[#9f754c]/20 text-[#f9d1b8]' : 'bg-[#fef6e5] text-[#9f754c]'}`}>
            ou avec tes ingrédients secrets
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-[#fef6e5]' : 'text-[#9f754c]'}`}>
            📧 Ton email
          </label>
          <div className="relative">
            <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-[#f9d1b8]' : 'text-[#9f754c]/50'}`} />
            <input
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#f8971b] ${
                isDark 
                  ? 'bg-[#9f754c]/10 border-[#f8bb4c]/30 text-[#fef6e5] placeholder-[#f9d1b8]/50' 
                  : 'bg-white border-[#f9d1b8] text-[#9f754c] placeholder-[#9f754c]/40'
              }`}
              placeholder="chef@cuisine-secrete.com"
              required
              autoComplete="email"
            />
          </div>
        </div>

        <div>
          <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-[#fef6e5]' : 'text-[#9f754c]'}`}>
            🔐 Ton mot de passe
          </label>
          <div className="relative">
            <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-[#f9d1b8]' : 'text-[#9f754c]/50'}`} />
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange('password')}
              className={`w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#f8971b] ${
                isDark 
                  ? 'bg-[#9f754c]/10 border-[#f8bb4c]/30 text-[#fef6e5] placeholder-[#f9d1b8]/50' 
                  : 'bg-white border-[#f9d1b8] text-[#9f754c] placeholder-[#9f754c]/40'
              }`}
              placeholder="Recette secrète..."
              required
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-[#f9d1b8]' : 'text-[#9f754c]/50'} hover:text-[#f8971b] transition-colors`}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs text-center animate-bounce">
            {error.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-6 text-sm rounded-xl bg-gradient-to-r from-[#f8971b] to-[#f8bb4c] text-white font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
              On met ça au four...
            </span>
          ) : (
            `🍽️ ${isLogin ? 'À table !' : 'Réserver ma place'}`
          )}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={toggleAuthMode}
          className={`text-xs hover:underline transition-colors ${isDark ? 'text-[#f9d1b8] hover:text-[#fef6e5]' : 'text-[#9f754c] hover:text-[#f8971b]'}`}
          type="button"
        >
          {isLogin ? 'Première visite ? Goûte nos spécialités !' : 'Déjà client ? Retourne en cuisine !'}
        </button>
      </div>
    </div>
  );
};

export default AuthCard;