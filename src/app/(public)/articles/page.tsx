import { getAllArticlesAction } from '@/lib/actions/articles';
import ArticlesClient from '@/features/articles/components/article-client';

export default async function ArticlesPage() {
    const articles = await getAllArticlesAction();
    return <ArticlesClient articles={articles} />;
}