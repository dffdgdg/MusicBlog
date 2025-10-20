// Файл: src/app/admin/edit/[slug]/page.tsx

import ArticleForm from '@/components/ArticleForm';
import { getArticleBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function EditArticlePage({ params }: { params: { slug: string } }) {
    // Получаем данные статьи для редактирования
    const article = await getArticleBySlug(params.slug);

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