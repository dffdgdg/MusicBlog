// src/components/layout/UserMenu.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, LogOut, FileText, Shield, User as UserIcon } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { AuthModal } from '@/components/auth/AuthModal';

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const { user, isAuthenticated, logout, hasPermission } = useAuthStore();

  // Проверяем что компонент монтирован на клиенте
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  // Показываем скелетон пока не монтирован на клиенте
  if (!isMounted) {
    return (
      <div className="flex items-center gap-2 p-2">
        <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
        <div className="hidden md:block">
          <div className="h-4 bg-gray-700 rounded w-20 mb-1 animate-pulse"></div>
          <div className="h-3 bg-gray-700 rounded w-16 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
        >
          <UserIcon size={20} />
          <span className="hidden md:inline">Войти</span>
        </button>
        
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      </>
    );
  }

  return (
    <div className="relative flex items-center" ref={menuRef}>
      {/* Аватар пользователя */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/10 transition-all duration-300 group"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
          {user?.name?.charAt(0) || 'U'}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-white text-sm font-semibold leading-none">
            {user?.name}
          </p>
          <p className="text-slate-400 text-xs capitalize">
            {user?.role}
          </p>
        </div>
      </button>

      {/* Выпадающее меню */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 top-full mt-2 w-64 bg-gray-900 border-2 border-orange-500/20 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Информация о пользователе */}
            <div className="p-4 border-b border-orange-500/20">
              <p className="font-semibold text-white">{user?.name}</p>
              <p className="text-slate-400 text-sm">{user?.email}</p>
              <div className="flex gap-2 mt-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${
                  user?.role === 'admin' 
                    ? 'bg-red-500/20 text-red-400 border-red-500/30'
                    : user?.role === 'author'
                    ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    : 'bg-green-500/20 text-green-400 border-green-500/30'
                }`}>
                  {user?.role === 'admin' ? 'Администратор' : 
                   user?.role === 'author' ? 'Автор' : 'Читатель'}
                </span>
              </div>
            </div>

            {/* Навигация */}
            <div className="p-2 space-y-1">
              {/* Панель автора */}
              {hasPermission('author') && (
                <a
                  href="/author"
                  className="flex items-center gap-3 w-full px-3 py-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                >
                  <FileText size={16} />
                  Панель автора
                </a>
              )}

              {/* Панель администратора */}
              {hasPermission('admin') && (
                <a
                  href="/admin"
                  className="flex items-center gap-3 w-full px-3 py-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                >
                  <Shield size={16} />
                  Админ-панель
                </a>
              )}

              {/* Общие настройки */}
              <button className="flex items-center gap-3 w-full px-3 py-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200">
                <Settings size={16} />
                Настройки
              </button>

              {/* Разделитель */}
              <div className="border-t border-orange-500/20 my-1" />

              {/* Выход */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200"
              >
                <LogOut size={16} />
                Выйти
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}