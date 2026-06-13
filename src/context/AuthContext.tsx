// ============================================================
// AUTHENTICATION CONTEXT
// Provides JWT-based auth state management
// In production: integrates with FastAPI /auth endpoints
// ============================================================

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, AuthState } from '../types';
import { mockUsers } from '../data/mockData';
import toast from 'react-hot-toast';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'driver' | 'passenger';
}

const AuthContext = createContext<AuthContextType | null>(null);

// Simulate JWT token generation
function generateToken(userId: string): string {
  return btoa(`${userId}:${Date.now()}:rideshare_secret`);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const stored = localStorage.getItem('rideshare_auth');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return { user: null, token: null, isAuthenticated: false };
      }
    }
    return { user: null, token: null, isAuthenticated: false };
  });

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Simulate API call to POST /api/auth/login
    await new Promise((r) => setTimeout(r, 800));

    // Demo credentials
    const user = mockUsers.find((u) => u.email === email);
    if (!user) {
      toast.error('Invalid email or password');
      return false;
    }

    // In production: verify hashed password with bcrypt
    if (password.length < 4) {
      toast.error('Invalid email or password');
      return false;
    }

    const token = generateToken(user.id);
    const newState: AuthState = { user, token, isAuthenticated: true };
    setAuthState(newState);
    localStorage.setItem('rideshare_auth', JSON.stringify(newState));
    toast.success(`Welcome back, ${user.name}! 🚗`);
    return true;
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    // Simulate API call to POST /api/auth/register
    await new Promise((r) => setTimeout(r, 1000));

    const existingUser = mockUsers.find((u) => u.email === data.email);
    if (existingUser) {
      toast.error('Email already registered');
      return false;
    }

    const newUser: User = {
      id: `u${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      rating: 5.0,
      totalRides: 0,
      joinedDate: new Date().toISOString().split('T')[0],
      verified: false,
      preferences: {
        music: true,
        smoking: false,
        pets: false,
        ac: true,
        luggage: 'small',
      },
    };

    mockUsers.push(newUser);
    const token = generateToken(newUser.id);
    const newState: AuthState = { user: newUser, token, isAuthenticated: true };
    setAuthState(newState);
    localStorage.setItem('rideshare_auth', JSON.stringify(newState));
    toast.success(`Welcome to RideShare AI, ${newUser.name}! 🎉`);
    return true;
  }, []);

  const logout = useCallback(() => {
    setAuthState({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem('rideshare_auth');
    toast.success('Logged out successfully');
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    setAuthState((prev) => {
      if (!prev.user) return prev;
      const updatedUser = { ...prev.user, ...data };
      const newState = { ...prev, user: updatedUser };
      localStorage.setItem('rideshare_auth', JSON.stringify(newState));
      return newState;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
