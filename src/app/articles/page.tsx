// Файл: src/app/articles/page.tsx (Серверный компонент)

import { getAllArticles } from '@/lib/data';
import ArticleList from '@/components/ArticleList';

export default async function ArticlesPage() {
    // 1. Получаем данные на сервере
    const articles = await getAllArticles();

    return (
        <main className="pt-24 md:pt-32 container mx-auto px-6 py-12">
            <header className="text-center mb-12">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white">
                    Журнал
                </h1>
                <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-300">
                    Все наши знания, собранные в одном месте. Найдите интересующую вас тему и погрузитесь в изучение.
                </p>
            </header>

            {/* 2. Передаем данные в клиентский компонент для отображения и интерактивности */}
            <ArticleList articles={articles} />
        </main>
    );
}