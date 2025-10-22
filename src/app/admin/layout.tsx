// Файл: src/app/admin/layout.tsx

import Link from 'next/link';
import { LayoutDashboard, PlusCircle, Settings, Users, BarChart3, Home } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
        <div className="pt-15">
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-orange-900/10">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/80 to-orange-900/40"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 xl:px-20 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 border border-orange-500/20"
            >
              <Home className="w-4 h-4" />
              На главную
            </Link>
            <div className="hidden sm:block text-slate-400">/</div>
            <h1 className="text-2xl font-black text-white">
              <span className="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
                Админ-панель
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Онлайн</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Боковая панель */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border-2 border-orange-500/20 p-6 shadow-2xl sticky top-8">
              {/* Навигация */}
              <nav className="space-y-2">
                <Link 
                  href="/admin" 
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300 group"
                >
                  <LayoutDashboard className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Все статьи</span>
                </Link>

                <Link 
                  href="/admin/add" 
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300 group"
                >
                  <PlusCircle className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Новая статья</span>
                </Link>

                <Link 
                  href="/admin/analytics" 
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300 group"
                >
                  <BarChart3 className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Аналитика</span>
                </Link>

                <Link 
                  href="/admin/users" 
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300 group"
                >
                  <Users className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Пользователи</span>
                </Link>

                <Link 
                  href="/admin/settings" 
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300 group"
                >
                  <Settings className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Настройки</span>
                </Link>
              </nav>

              {/* Статистика */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-slate-400">
                    <span>Статей опубликовано:</span>
                    <span className="text-white font-semibold">24</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Черновиков:</span>
                    <span className="text-orange-400 font-semibold">3</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Посещений сегодня:</span>
                    <span className="text-green-400 font-semibold">156</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Основной контент */}
          <main className="flex-1">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border-2 border-orange-500/20 p-8 shadow-2xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
    </div>
  );
}