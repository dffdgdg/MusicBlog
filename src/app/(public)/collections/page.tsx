import { getAllCollectionsAction } from '@/lib/actions/collections';
import Link from 'next/link';

export default async function CollectionsPage() {
  const collections = await getAllCollectionsAction();
  
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-6 lg:px-12 xl:px-20 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-12 text-center">
          Все подборки
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map(collection => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="block p-8 rounded-3xl border-2 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-orange-500/20 hover:border-orange-500/50 transition-all duration-500"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                {collection.title}
              </h3>
              <p className="text-slate-300 mb-6">
                {collection.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {collection.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}