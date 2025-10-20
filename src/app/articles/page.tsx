// Файл: src/app/articles/page.tsx

import { getAllArticles } from '@/lib/data';
import ArticlesClient from '@/components/ArticlesClient';

export default async function ArticlesPage() {
    const articles = await getAllArticles();

    return <ArticlesClient articles={articles} />;
}