// Файл: src/app/admin/add/page.tsx

import ArticleForm from '@/components/ArticleForm';

export default function AddArticlePage() {
    return (
        <div>
            <h1 className="text-4xl font-bold mb-8">Добавить новую статью</h1>
            <ArticleForm />
        </div>
    );
}