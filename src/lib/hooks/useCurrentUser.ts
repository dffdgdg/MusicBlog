"use client";

import { useAuthStore } from '@/stores/auth-store';

export function useCurrentUser() {
  const { user, isAuthenticated } = useAuthStore();
  
  return {
    user,
    isAuthenticated,
    isAuthor: user?.role === 'author',
    isAdmin: user?.role === 'admin',
    isReader: user?.role === 'reader'
  };
}