"use client";

import { FileText, Plus, BarChart3, Edit, Users } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

function AuthorDashboardContent() {
  const { user } = useAuthStore();

  const stats = {
    totalArticles: 12,
    publishedArticles: 8,
    draftArticles: 4,
    totalViews: 15420
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-6 lg:px-12 xl:px-20 py-8">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            <span className="bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent">
              Панель автора
            </span>
          </h1>
          <p className="text-slate-400">
            Управляйте вашими статьями и отслеживайте статистику
          </p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-2xl p-6 border border-orange-500/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Всего статей</p>
                <p className="text-2xl font-bold text-white">{stats.totalArticles}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-2xl p-6 border border-green-500/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Edit className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Опубликовано</p>
                <p className="text-2xl font-bold text-white">{stats.publishedArticles}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-2xl p-6 border border-blue-500/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Черновики</p>
                <p className="text-2xl font-bold text-white">{stats.draftArticles}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-2xl p-6 border border-purple-500/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Просмотры</p>
                <p className="text-2xl font-bold text-white">{stats.totalViews}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Быстрые действия */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link
          href="/author/articles/new" 
          className="p-6 bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 rounded-2xl hover:border-orange-500/40 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Новая статья</h3>
                  <p className="text-slate-400 text-sm">Создать новую статью</p>
                </div>
              </div>
            </div>
          </Link>

          <Link
            href="/author/articles"
            className="p-6 bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-2xl hover:border-green-500/40 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Edit className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Мои статьи</h3>
                  <p className="text-slate-400 text-sm">Управление статьями</p>
                </div>
              </div>
            </div>
          </Link>

          <Link
            href="/author/analytics"
            className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-2xl hover:border-purple-500/40 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Аналитика</h3>
                  <p className="text-slate-400 text-sm">Статистика просмотров</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Основной контент */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border-2 border-orange-500/20 p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Мои статьи</h2>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-slate-300 mb-2">Здесь будут ваши статьи</h3>
            <p className="text-slate-400 mb-6">Создайте свою первую статью как автор</p>
            <Link
              href="/admin/add"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-purple-500 text-white font-semibold px-6 py-3 rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Создать статью
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthorDashboard() {
  return (
    <ProtectedRoute requiredRole="author">
      <AuthorDashboardContent />
    </ProtectedRoute>
  );
}