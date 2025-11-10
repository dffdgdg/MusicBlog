// src/stores/auth-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthState } from '@/types/auth';

interface AuthStore extends AuthState {
  login: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  hasPermission: (role: User['role']) => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      
      login: (user: User) => set({ 
        user, 
        isAuthenticated: true,
        isLoading: false 
      }),
      
      logout: () => set({ 
        user: null, 
        isAuthenticated: false,
        isLoading: false 
      }),
      
      setLoading: (isLoading: boolean) => set({ isLoading }),
      hasPermission: (requiredRole: User['role']) => {
        const { user } = get();
        if (!user) return false;
        const roleHierarchy = {
          reader: ['reader'],
          author: ['reader', 'author'], 
          admin: ['reader', 'author', 'admin']
        };
      return roleHierarchy[user.role]?.includes(requiredRole) || false;
    },
  }),
  {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
);