import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { getAllArticlesAction } from '@/lib/actions/articles';
import { getAuthorStats } from '@/lib/actions/author';
import { FileText } from 'lucide-react'; 


async function AuthorAnalyticsPage() {
  const articles = await getAllArticlesAction();
  const stats = await getAuthorStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
          <span className="bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent">
            Аналитика
          </span>
        </h1>
        <p className="text-slate-400">
          Статистика ваших статей и просмотров
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* Добавьте остальные карточки статистики */}
      </div>
    </div>
  );
}

export default function ProtectedAnalyticsPage() {
  return (
    <ProtectedRoute requiredRole="author">
      <AuthorAnalyticsPage />
    </ProtectedRoute>
  );
}