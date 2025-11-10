import { getAllArticlesAction } from '@/lib/actions/articles';
import HomePageClient from "@/features/home/components/home-client"; 

export default async function HomePage() {
    const allArticles = await getAllArticlesAction();
    const latestArticles = allArticles; 

    return (
        <HomePageClient latestArticles={latestArticles} />
    );
}