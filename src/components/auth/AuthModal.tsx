"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Mail, Lock, User, LogIn, UserPlus, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { createPortal } from 'react-dom';
import { registerUserAction, loginUserAction } from '@/lib/actions/auth';
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
  const [error, setError] = useState('');
  
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let result;
      
      if (isLogin) {
        result = await loginUserAction(formData.email, formData.password);
      } else {
        let role: 'reader' | 'author' | 'admin' = 'reader';
        if (formData.email.includes('admin')) {
          role = 'admin';
        } else if (formData.email.includes('author')) {
          role = 'author';
        }

        result = await registerUserAction({
          email: formData.email,
          name: formData.name,
          password: formData.password,
          role
        });
      }

      if (result.success && result.user) {
        const user = result.user as UserType;
        login(user);
        onClose();
        setFormData({ email: '', password: '', name: '' });
        
        window.location.reload();
      } else {
        setError(result.message || 'Произошла ошибка');
      }
    } catch (error) {
      setError('Произошла непредвиденная ошибка');
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
          {/* Сообщение об ошибке */}
          {error && (
            <div className="flex items-center gap-3 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400">
              <AlertCircle size={16} />
              <span className="text-sm">{error}</span>
            </div>
          )}

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
              minLength={6}
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
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-orange-400 hover:text-orange-300 transition-colors text-sm"
          >
            {isLogin 
              ? 'Нет аккаунта? Создать новый' 
              : 'Уже есть аккаунт? Войти'
            }
          </button>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}