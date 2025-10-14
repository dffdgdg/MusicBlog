// Файл: src/app/admin/add/page.tsx

// 1. Импортируем наш универсальный компонент формы
import ArticleForm from '@/components/ArticleForm';

export default function AddArticlePage() {
    return (
        <div>
            <h1 className="text-4xl font-bold mb-8">Добавить новую статью</h1>

            {/* 
              2. Просто рендерим компонент формы.
              Мы не передаем в него `initialData`, поэтому форма
              автоматически будет работать в режиме "создания".
            */}
            <ArticleForm />
        </div>
    );
}