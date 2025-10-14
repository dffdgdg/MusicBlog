// Файл: src/app/admin/layout.tsx
import Link from 'next/link';
import { LayoutDashboard, PlusCircle } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-20 container mx-auto px-6">
      <div className="flex gap-8">
        <aside className="w-1/4 lg:w-1/5">
          <nav className="flex flex-col space-y-2">
            <h2 className="text-xl font-bold mb-4">Админ-панель</h2>
            <Link href="/admin" className="admin-nav-link">
              <LayoutDashboard size={20} />
              <span>Все статьи</span>
            </Link>
            <Link href="/admin/add" className="admin-nav-link">
              <PlusCircle size={20} />
              <span>Добавить новую</span>
            </Link>
          </nav>
        </aside>
        <main className="w-3/4 lg:w-4/5">
          {children}
        </main>
      </div>
    </div>
  );
}