import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, User, Share2, BookOpen, Tag, Eye } from 'lucide-react';
import { getArticleBySlugAction, getAllArticlesAction } from '@/lib/actions/articles';
import MarkdownRenderer from '@/components/shared/ui/MarkdownRenderer';
import type { Metadata } from 'next';
import type { RelatedArticle } from '@/features/articles';
import { ViewTracker } from '@/components/shared/ui/ViewTracker';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlugAction(slug);
  
  if (!article) {
    return {
      title: 'Статья не найдена',
    };
  }

  return {
    title: `${article.title} | СоздайМузыку`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedDate,
      authors: [article.author.name],
    },
  };
}

export async function generateStaticParams() {
    const articles = await getAllArticlesAction();
    return articles.map(article => ({
        slug: article.slug,
    }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    
    const article = await getArticleBySlugAction(slug);

    if (!article) {
        notFound();
    }

    const relatedArticles: RelatedArticle[] = article.relatedArticles || [];
    const tags: string[] = article.tags || [];
    const level = article.level || 'Начальный';
    const views: number = article.views || 0;

    return (
        <div className="relative min-h-screen">
            <div className="fixed inset-0 -z-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/80 to-orange-900/40"></div>
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
            </div>

            <ViewTracker slug={slug} />

            <div className="container mx-auto px-6 lg:px-12 xl:px-20 py-32">
                <nav className="mb-12">
                    <Link 
                        href="/articles"
                        className="inline-flex items-center gap-3 text-slate-300 hover:text-orange-400 transition-colors group font-semibold"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Назад к статьям
                    </Link>
                </nav>

                <article className="max-w-4xl mx-auto">
                    {/* Заголовок статьи */}
                    <header className="text-center mb-16">
                        {/* Категория и теги */}
                        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                            <div className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/20 text-cyan-400 rounded-2xl text-sm font-bold border border-cyan-500/30">
                                <BookOpen className="w-4 h-4" />
                                {article.category}
                            </div>
                            
                            {/* Уровень сложности */}
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold border ${
                                level === 'Начальный' 
                                    ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                    : level === 'Средний'
                                    ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                                    : 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                            }`}>
                                {level}
                            </div>
                        </div>

                        {/* Заголовок */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-8">
                            <span className="bg-gradient-to-r from-orange-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                                {article.title}
                            </span>
                        </h1>

                        {/* Краткое описание */}
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                            {article.excerpt}
                        </p>

                        {/* Мета-информация */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-slate-300 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                    {article.author.name.charAt(0)}
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold text-white">{article.author.name}</p>
                                    <p className="text-sm text-slate-400">{article.author.role}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-orange-400" />
                                    <span className="font-semibold">{article.readingTime} мин</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-purple-400" />
                                    <span className="font-semibold">{article.publishedDate}</span>
                                </div>
                                {/* ДОБАВЛЕНО: Счетчик просмотров */}
                                <div className="flex items-center gap-2">
                                    <Eye className="w-4 h-4 text-cyan-400" />
                                    <span className="font-semibold">{views} просмотров</span>
                                </div>
                            </div>
                        </div>

                        {/* Теги */}
                        {tags.length > 0 && (
                            <div className="flex flex-wrap justify-center gap-2 mb-6">
                                {tags.map(tag => (
                                    <span 
                                        key={tag}
                                        className="inline-flex items-center gap-1 px-3 py-1 bg-white/5 text-slate-300 rounded-full text-sm border border-orange-500/20"
                                    >
                                        <Tag className="w-3 h-3" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Действия */}
                        <div className="flex items-center justify-center gap-4">
                            <button className="flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-xl border-2 border-orange-500/20 text-slate-300 rounded-2xl hover:border-orange-500/50 hover:text-white transition-all duration-300">
                                <Share2 className="w-4 h-4" />
                                Поделиться
                            </button>
                        </div>
                    </header>

                    {/* Тело статьи */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl border-2 border-orange-500/20 p-8 md:p-12 shadow-2xl">
                        <MarkdownRenderer content={article.content} />

                        {/* Разделитель */}
                        <div className="my-16 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

                        {/* Призыв к действию */}
                        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-orange-500/10 via-purple-500/10 to-cyan-500/10 border border-orange-500/30">
                            <h3 className="text-2xl font-black text-white mb-4">
                                Понравилась статья?
                            </h3>
                            <p className="text-slate-300 mb-6 max-w-md mx-auto">
                                Изучайте больше материалов по созданию музыки в нашем журнале
                            </p>
                            <Link
                                href="/articles"
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-400 hover:to-purple-400 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-orange-500/40 transition-all duration-300"
                            >
                                К другим статьям
                                <ArrowLeft className="w-5 h-5 rotate-180" />
                            </Link>
                        </div>
                    </div>

                    {/* Рекомендуемые статьи - показываем только если есть данные */}
                    {relatedArticles.length > 0 && (
                        <footer className="mt-16">
                            <div className="text-center mb-12">
                                <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                                    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                        Читайте также
                                    </span>
                                </h3>
                                <p className="text-slate-300 text-lg">
                                    Больше интересных материалов по теме
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {relatedArticles.map((related: RelatedArticle) => (
                                    <Link 
                                        key={related.slug} 
                                        href={`/articles/${related.slug}`}
                                        className="group block p-6 rounded-2xl border-2 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-orange-500/20 hover:border-orange-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-bold border border-cyan-500/30">
                                                {related.category}
                                            </span>
                                            <span className="text-slate-400 text-xs flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {related.readingTime} мин
                                            </span>
                                        </div>
                                        <h4 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors mb-2 line-clamp-2">
                                            {related.title}
                                        </h4>
                                        <p className="text-slate-400 text-sm line-clamp-2">
                                            {related.excerpt}
                                        </p>
                                        <div className="flex items-center gap-2 mt-4 text-orange-400 text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                                            Читать
                                            <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </footer>
                    )}
                </article>
            </div>
        </div>
    );
}