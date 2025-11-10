import ArticleForm from '@/components/forms/article-form';

export default function AddArticlePage() {
    return (
        <div>
            <h1 className="text-4xl font-bold mb-8">Добавить новую статью</h1>
            <ArticleForm />
        </div>
    );
}