// src/app/author/articles/page.tsx
import { getAuthorArticles } from '@/lib/actions/author';
import Link from 'next/link';
import { Plus, Eye, Edit, Calendar, BarChart3 } from 'lucide-react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

async function AuthorArticlesContent() {
  const articles = await getAuthorArticles();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Мои статьи</h1>
          <p className="text-slate-400">Управление вашими публикациями</p>
        </div>
        <Link
          href="/author/articles/new"
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-400 hover:to-purple-400 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          Новая статья
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-bold text-slate-300 mb-2">Статей пока нет</h3>
          <p className="text-slate-400 mb-6">Создайте свою первую статью</p>
          <Link
            href="/author/articles/new"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-purple-500 text-white font-semibold px-6 py-3 rounded-2xl hover:shadow-lg transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            Создать статью
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {articles.map((article: any) => (
            <div
              key={article.id}
              className="bg-white/5 rounded-2xl border border-orange-500/20 p-6 hover:border-orange-500/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                      article.status === 'published'
                        ? 'bg-green-500/20 text-green-400 border-green-500/30'
                        : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                    }`}>
                      {article.status === 'published' ? 'Опубликовано' : 'Черновик'}
                    </span>
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm border border-cyan-500/30">
                      {article.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-slate-300 mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center gap-6 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {article.publishedDate || 'Не опубликовано'}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {article.views || 0} просмотров
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChart3 className="w-4 h-4" />
                      {article.readingTime || 0} мин
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Link
                    href={`/articles/${article.slug}`}
                    target="_blank"
                    className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-xl transition-all duration-300"
                    title="Просмотреть"
                  >
                    <Eye className="w-5 h-5" />
                  </Link>
                  
                  <Link
                    href={`/author/articles/edit/${article.slug}`}
                    className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all duration-300"
                    title="Редактировать"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AuthorArticlesPage() {
  return (
    <ProtectedRoute requiredRole="author">
      <AuthorArticlesContent />
    </ProtectedRoute>
  );
}