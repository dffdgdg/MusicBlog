// src/components/auth/ProtectedRoute.tsx - ОБНОВИТЬ
"use client";

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import type { UserRole } from '@/types/auth';
import { AuthModal } from '@/components/auth/AuthModal';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export function ProtectedRoute({ 
  children, 
  requiredRole = 'reader'
}: ProtectedRouteProps) {
  const { isAuthenticated, hasPermission, isLoading, user } = useAuthStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [accessChecked, setAccessChecked] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        setShowAuthModal(true);
      }
      setAccessChecked(true);
    }
  }, [isAuthenticated, isLoading]);

  // Пока загружается или проверяется доступ, показываем загрузку
  if (isLoading || !accessChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-white mb-4">Требуется авторизация</h2>
            <p className="text-slate-400 mb-6">Пожалуйста, войдите в систему</p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-gradient-to-r from-orange-500 to-purple-500 text-white px-6 py-3 rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              Войти сейчас
            </button>
          </div>
        </div>
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      </>
    );
  }

  // ОБНОВЛЕННАЯ ПРОВЕРКА ПРАВ - админы имеют доступ к авторским функциям
  const hasAccess = requiredRole === 'author' 
    ? hasPermission('author') || user?.role === 'admin'
    : hasPermission(requiredRole);

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-white mb-4">Недостаточно прав</h2>
          <p className="text-slate-400 mb-6">
            Для доступа к этой странице требуется роль: <strong>
              {requiredRole === 'author' ? 'автор или администратор' : requiredRole}
            </strong>
          </p>
          <p className="text-slate-500 text-sm">
            Ваша текущая роль: <strong>{user?.role}</strong>
          </p>
          <div className="mt-6">
            <button
              onClick={() => window.history.back()}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl transition-colors"
            >
              Назад
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}