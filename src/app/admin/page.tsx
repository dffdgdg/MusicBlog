// Файл: src/app/admin/page.tsx
import { getAllArticles } from '@/lib/data';
import Link from 'next/link';
// Мы создадим этот компонент на следующем шаге
import AdminArticleControls from '@/components/AdminArticleControls';

export default async function AdminDashboardPage() {
    const articles = await getAllArticles();

    return (
        <div>
            <h1 className="text-4xl font-bold mb-8">Все статьи ({articles.length})</h1>
            <div className="rounded-2xl border border-white/10 bg-white/5">
                {articles.map(article => (
                    <div key={article.slug} className="flex justify-between items-center p-4 border-b border-white/10 last:border-b-0">
                        <div>
                            <h3 className="font-semibold text-lg text-white">{article.title}</h3>
                            <p className="text-sm text-gray-400">{article.category} • {article.publishedDate}</p>
                        </div>
                        <AdminArticleControls slug={article.slug} />
                    </div>
                ))}
            </div>
        </div>
    );
}