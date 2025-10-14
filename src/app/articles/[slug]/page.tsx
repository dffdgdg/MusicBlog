// Файл: src/app/articles/[slug]/page.tsx

import Link from 'next/link';
import { notFound } from 'next/navigation';

// Шаг 1: Импортируем наши НОВЫЕ ФУНКЦИИ и типы из data.ts
import { getArticleBySlug, getAllArticles, type Article } from '@/lib/data';

// Шаг 2: Обновляем generateStaticParams, чтобы он получал slug'и из Firebase
// Эта функция сообщает Next.js, какие страницы статей существуют
export async function generateStaticParams() {
    // Получаем все статьи из Firestore
    const articles = await getAllArticles();
    // Возвращаем их slug'и в формате, который требует Next.js
    return articles.map(article => ({
        slug: article.slug,
    }));
}


// --- Главный компонент страницы ---

export default async function ArticlePage({ params }: { params: { slug:string } }) {
    // Шаг 3: Используем новую функцию для получения ОДНОЙ статьи из Firestore
    const article = await getArticleBySlug(params.slug);

    // Если статья по такому slug не найдена, показываем страницу 404
    if (!article) {
        notFound();
    }

    // Вся JSX-разметка ниже остается без изменений, так как структура данных 'article' та же
    return (
        <main className="pt-24 md:pt-32 container mx-auto px-6 py-12">
            <article className="max-w-5xl mx-auto rounded-2xl border p-8 md:p-12 bg-black/20 backdrop-blur-xl shadow-2xl border-white/10">
                {/* --- Заголовок статьи --- */}
                <header className="mb-12 text-center">
                    <p className="font-semibold text-orange-400 mb-2">{article.category}</p>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white">{article.title}</h1>
                    <div className="flex justify-center items-center flex-wrap gap-4 mt-6 text-gray-400">
                        <span>{article.author.name}</span>
                        <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                        <span>{article.publishedDate}</span>
                        <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                        <span>{article.readingTime} мин на чтение</span>
                    </div>
                </header>
                
                {/* --- Тело статьи (логика рендеринга блоков) --- */}
                <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-6">
                    {article.content.map((block, index) => {
                        switch (block.type) {
                            case 'heading': return <h2 key={index} className="text-3xl font-bold text-white !mt-12">{block.text}</h2>;
                            case 'paragraph': return <p key={index} className="leading-relaxed">{block.text}</p>;
                            case 'list': return <ul key={index} className="list-disc pl-5 space-y-2">{block.items.map((item, i) => <li key={i}>{item}</li>)}</ul>;
                            case 'quote': return <blockquote key={index} className="border-l-4 border-orange-500 pl-4 italic"><p>{block.text}</p><cite className="block text-right not-italic mt-2 text-gray-400">&mdash; {block.author}</cite></blockquote>;
                            case 'youtube': return (<figure key={index} className="my-8"><div className="aspect-video w-full rounded-lg overflow-hidden border border-white/10"><iframe src={`https://www.youtube.com/embed/${block.videoId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full"></iframe></div><figcaption className="text-center text-sm text-gray-400 mt-2">{block.caption}</figcaption></figure>);
                            default: return null;
                        }
                    })}
                </div>

                {/* --- Раздел "Читайте также" --- */}
                <footer className="mt-16 pt-8 border-t border-white/10">
                    <h3 className="text-2xl font-bold mb-4 text-white">Читайте также</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {article.relatedArticles.map(related => (
                            <Link key={related.slug} href={`/articles/${related.slug}`} className="block p-4 rounded-lg bg-gray-800/50 hover:bg-orange-500/10 transition-colors">
                                <p className="font-bold text-lg">{related.title}</p>
                            </Link>
                        ))}
                    </div>
                </footer>
            </article>
        </main>
    );
}