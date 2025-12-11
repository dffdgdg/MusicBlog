import { getCollectionBySlugAction } from '@/lib/actions/collections';
import { getAllArticlesAction } from '@/lib/actions/articles';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, BookOpen } from 'lucide-react';

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = await getCollectionBySlugAction(slug);
  
  if (!collection) {
    notFound();
  }
  
  const allArticles = await getAllArticlesAction();
  const collectionArticles = allArticles.filter(article => 
    collection.articles.includes(article.slug)
  );
  
  return (
    <div className="relative min-h-screen">
      {/* Общий фон как на главной */}
      <div className="fixed inset-0 -z-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/80 to-orange-900/40"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 xl:px-20 py-32">
        {/* Навигация */}
        <nav className="mb-12">
          <Link 
            href="/collections"
            className="inline-flex items-center gap-3 text-slate-300 hover:text-orange-400 transition-colors group font-semibold"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Назад к подборкам
          </Link>
        </nav>

        {/* Заголовок коллекции */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8">
            <span className="bg-gradient-to-r from-orange-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              {collection.title}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            {collection.description}
          </p>
        </div>

        {/* Теги коллекции */}
        {collection.tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {collection.tags.map(tag => (
              <span
                key={tag}
                className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full text-sm font-semibold border border-orange-500/30 hover:border-orange-500/50 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Статьи коллекции */}
        {collectionArticles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">??</div>
            <h3 className="text-xl font-bold text-slate-300 mb-2">В этой подборке пока нет статей</h3>
            <p className="text-slate-400 mb-6">Скоро здесь появятся интересные материалы</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">
                Статьи в подборке <span className="text-orange-400">({collectionArticles.length})</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collectionArticles.map(article => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="group block p-8 rounded-3xl border-2 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-orange-500/20 hover:border-orange-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
                >
                  {/* Категория и время чтения */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-semibold border border-cyan-500/30">
                      {article.category}
                    </span>
                    <span className="text-slate-400 text-sm flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readingTime} мин
                    </span>
                  </div>

                  {/* Заголовок */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Описание */}
                  <p className="text-slate-300 mb-6 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Уровень сложности */}
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                      article.level === 'Начальный' 
                        ? 'bg-green-500/20 text-green-400 border-green-500/30'
                        : article.level === 'Средний'
                        ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                        : 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                    }`}>
                      {article.level}
                    </span>
                    <span className="text-orange-400 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                      Читать →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Призыв к действию */}
        {collectionArticles.length > 0 && (
          <div className="mt-16 text-center">
            <div className="p-8 rounded-3xl border-2 bg-gradient-to-br from-orange-500/10 via-purple-500/10 to-cyan-500/10 backdrop-blur-xl border-orange-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">
                Изучили все материалы?
              </h3>
              <p className="text-slate-300 mb-6 max-w-md mx-auto">
                Посмотрите другие подборки статей по созданию музыки
              </p>
              <Link
                href="/collections"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-400 hover:to-purple-400 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-orange-500/40 transition-all duration-300"
              >
                <BookOpen className="w-5 h-5" />
                К другим подборкам
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}