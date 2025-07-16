import React, { createContext, useContext, useState, type ReactNode, useCallback } from 'react';
import type { User } from '../types/user';
import type { AuthError } from '../types/auth';
import { useNavigate } from 'react-router-dom';


interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, authMode?: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [, setIsLoading] = useState<boolean>(false);
  const [, setError] = useState<AuthError | null>(null);
  const navigate = useNavigate();
  
  const login = useCallback(
    async (email: string, password: string, authMode: string = 'login'): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        const endpoint =
          authMode === 'login'
            ? 'http://localhost:5000/auth/login'
            : 'http://localhost:5000/auth/register';

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
          setUser(data.user);
          alert('Bienvenue dans notre cuisine ! 👨‍🍳');
          if (localStorage.getItem('token') === data.token && data.role == 'CLIENT')
            navigate(`/accueil`);
          else if (localStorage.getItem('token') === data.token && data.role == 'ADMIN')
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
        setIsLoading(false);
      }
    },
    [navigate]
  );


  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};