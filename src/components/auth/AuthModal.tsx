// src/components/auth/AuthModal.tsx
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, LogIn, UserPlus } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { createPortal } from 'react-dom';
import type { User as UserType } from '@/types/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    // Улучшенное определение роли
    let role: 'admin' | 'author' | 'reader' = 'reader';
    
    if (formData.email.includes('admin') || formData.email === 'admin@demo.ru') {
      role = 'admin';
    } else if (formData.email.includes('author') || formData.email === 'author@demo.ru') {
      role = 'author';
    }

    const mockUser: UserType = {
  uid: Math.random().toString(36).substr(2, 9),
  email: formData.email,
  name: formData.name || (role === 'admin' ? 'Администратор' : role === 'author' ? 'Автор' : 'Читатель'),
  role: role,
  createdAt: new Date().toISOString(),
  isActive: true,
  id: Math.random().toString(36).substr(2, 9) 
};

    login(mockUser);
    onClose();
    setFormData({ email: '', password: '', name: '' });
  } catch (error) {
    console.error('Auth error:', error);
  } finally {
    setIsLoading(false);
  }
};

  // Используем портал для рендера вне компонента Header
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-900 rounded-3xl border-2 border-orange-500/20 p-6 w-full max-w-md"
      >
        {/* Заголовок */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {isLogin ? 'Вход в аккаунт' : 'Создание аккаунта'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Форма */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="group">
              <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-orange-400" />
                Ваше имя
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border-2 border-orange-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-500/50 transition-all duration-300"
                placeholder="Иван Иванов"
                required={!isLogin}
              />
            </div>
          )}

          <div className="group">
            <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-purple-400" />
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-3 bg-white/5 border-2 border-orange-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-500/50 transition-all duration-300"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="group">
            <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-400" />
              Пароль
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-4 py-3 bg-white/5 border-2 border-orange-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-500/50 transition-all duration-300"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-400 hover:to-purple-400 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                {isLogin ? <LogIn size={16} /> : <UserPlus size={16} />}
                {isLogin ? 'Войти' : 'Создать аккаунт'}
              </>
            )}
          </button>
        </form>

        {/* Переключение между входом и регистрацией */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-orange-400 hover:text-orange-300 transition-colors text-sm"
          >
            {isLogin 
              ? 'Нет аккаунта? Создать новый' 
              : 'Уже есть аккаунт? Войти'
            }
          </button>
        </div>

        {/* Демо-аккаунты */}
        <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-orange-500/20">
          <p className="text-slate-400 text-sm mb-2">Демо-аккаунты:</p>
          <div className="space-y-1 text-xs text-slate-300">
            <div>admin@demo.ru (Админ)</div>
            <div>author@demo.ru (Автор)</div>
            <div>user@demo.ru (Читатель)</div>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}