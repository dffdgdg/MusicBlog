// src/features/author/components/AuthorSidebar.tsx
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Plus, 
  BarChart3, 
  User,
  LogOut
} from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import type { User as UserType } from '@/types/auth';

interface AuthorSidebarProps {
  user: UserType;
}

const menuItems = [
  { href: '/author', icon: LayoutDashboard, label: 'Дашборд' },
  { href: '/author/articles', icon: FileText, label: 'Мои статьи' },
  { href: '/author/articles/new', icon: Plus, label: 'Новая статья' },
  { href: '/author/analytics', icon: BarChart3, label: 'Аналитика' },
  { href: '/author/profile', icon: User, label: 'Профиль' },
];

export default function AuthorSidebar({ user }: AuthorSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      logout();
      
      localStorage.removeItem('auth-storage');
      
      router.push('/');
      router.refresh(); 
      
    } catch (error)
    {
      console.error('Logout error:', error);
      router.push('/');
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-800 border-r border-orange-500/20">
      {/* Заголовок */}
      <div className="p-6 border-b border-orange-500/20">
        <Link href="/author" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-purple-500 rounded-lg flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Панель автора</h1>
            <p className="text-xs text-slate-400">{user.name}</p>
            <p className="text-xs text-slate-500 capitalize">{user.role}</p>
          </div>
        </Link>
      </div>

      {/* Навигация */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      {/* Футер */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-orange-500/20">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Выйти</span>
        </button>
      </div>
    </aside>
  );
}