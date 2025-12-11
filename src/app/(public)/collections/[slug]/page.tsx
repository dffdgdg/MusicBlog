import { getCollectionBySlugAction } from '@/lib/actions/collections';
import { getAllArticlesAction } from '@/lib/actions/articles';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Tag, Clock, Users } from 'lucide-react';

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
    <div className="min-h-screen pt-20">
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