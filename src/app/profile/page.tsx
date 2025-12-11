// src/app/profile/page.tsx
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/');
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-6 lg:px-12 xl:px-20 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-black text-white mb-8">
            <span className="bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent">
              Мой профиль
            </span>
          </h1>
          
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border-2 border-orange-500/20 p-8">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                <p className="text-slate-400">{user.email}</p>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold border ${
                  user.role === 'admin'
                    ? 'bg-red-500/20 text-red-400 border-red-500/30'
                    : user.role === 'author'
                    ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    : 'bg-green-500/20 text-green-400 border-green-500/30'
                }`}>
                  {user.role === 'admin' ? 'Администратор' : 
                   user.role === 'author' ? 'Автор' : 'Читатель'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-white/5 rounded-2xl">
                <h3 className="font-semibold text-white mb-2">Дата регистрации</h3>
                <p className="text-slate-400">
                  {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                </p>
              </div>
              
              <div className="p-4 bg-white/5 rounded-2xl">
                <h3 className="font-semibold text-white mb-2">Статус</h3>
                <p className="text-slate-400">
                  {user.isActive ? 'Активен' : 'Неактивен'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}