import { getAllCollectionsAction } from '@/lib/actions/collections';
import Link from 'next/link';
import { BookOpen, ArrowRight, Grid3X3, FolderOpen } from 'lucide-react';

export default async function CollectionsListPage() {
  const collections = await getAllCollectionsAction();
  
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
            href="/"
            className="inline-flex items-center gap-3 text-slate-300 hover:text-orange-400 transition-colors group font-semibold"
          >
            <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
            На главную
          </Link>
        </nav>

        {/* Заголовок */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-orange-500/20 rounded-3xl flex items-center justify-center border-2 border-purple-500/30">
              <Grid3X3 className="w-10 h-10 text-purple-400" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8">
            <span className="bg-gradient-to-r from-purple-400 via-orange-400 to-cyan-400 bg-clip-text text-transparent">
              Подборки
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Тематические коллекции статей для системного изучения
          </p>
        </div>

        {/* Список коллекций */}
        {collections.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">📚</div>
            <h3 className="text-3xl font-bold text-slate-300 mb-4">Подборок пока нет</h3>
            <p className="text-slate-400 max-w-md mx-auto text-lg">
              Скоро здесь появятся тематические коллекции статей
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {collections.map(collection => (
                <Link
                  key={collection.slug}
                  href={`/collections/${collection.slug}`}
                  className="group block p-8 rounded-3xl border-2 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-orange-500/20 hover:border-orange-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
                >
                  {/* Иконка коллекции */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-orange-500 rounded-2xl flex items-center justify-center">
                      <FolderOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                        {collection.title}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {collection.articles?.length || 0} статей
                      </p>
                    </div>
                  </div>
                  
                  {/* Описание */}
                  <p className="text-slate-300 mb-6 leading-relaxed line-clamp-3">
                    {collection.description}
                  </p>
                  
                  {/* Теги */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {collection.tags?.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs border border-orange-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                    {collection.tags?.length > 3 && (
                      <span className="px-3 py-1 bg-white/10 text-slate-400 rounded-full text-xs">
                        +{collection.tags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  {/* Кнопка */}
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <span className="text-slate-400 text-sm">
                      Изучить подборку
                    </span>
                    <ArrowRight className="w-5 h-5 text-orange-400 group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Дополнительная информация */}
        <div className="text-center mt-16 pt-8 border-t border-white/10">
          <p className="text-slate-400 mb-4">
            Хотите создать свою подборку или предложить тему?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold transition-colors"
          >
            Напишите нам
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}