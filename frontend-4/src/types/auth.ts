export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface AuthError {
  message: string;
  field?: 'email' | 'password' | 'general';
}

export interface SocialProvider {
  name: 'Google' | 'Facebook' | 'Apple';
  icon: React.ReactNode;
  color: string;
}

export type AuthMode = 'login' | 'register';

export interface AuthState {
  isLoading: boolean;
  error: AuthError | null;
  user: User | null;
}