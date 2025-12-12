import { getCollectionBySlugAction } from '@/lib/actions/collections';
import { getAllArticlesAction } from '@/lib/actions/articles';
import { notFound } from 'next/navigation';
import Link from 'next/link';

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
      <div className="container mx-auto px-6 lg:px-12 xl:px-20 py-12">
        {/* Заголовок коллекции */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {collection.title}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {collection.description}
          </p>
        </div>
        
        {/* Статьи коллекции */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collectionArticles.map(article => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="block p-6 rounded-2xl bg-white/5 border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-white mb-3">
                {article.title}
              </h3>
              <p className="text-slate-300 mb-4">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>{article.readingTime} мин</span>
                <span>{article.category}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}