import ArticleForm from '@/components/forms/article-form';
import { getArticleBySlugAction } from '@/lib/actions/articles';
import { notFound } from 'next/navigation';

export default async function EditArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await getArticleBySlugAction(slug);

    if (!article) {
        notFound();
    }

    return (
        <div>
            <h1 className="text-4xl font-bold mb-8">Редактировать статью</h1>
            {/* Рендерим ТУ ЖЕ САМУЮ форму, но передаем ей начальные данные */}
            <ArticleForm initialData={article} />
        </div>
    );
}