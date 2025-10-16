// Файл: src/app/page.tsx (Серверный компонент)

import { getAllArticles } from "@/lib/data";
import HomePageClient from "@/components/HomePageClient"; 

export default async function HomePage() {
    const allArticles = await getAllArticles();

    const latestArticles = allArticles; 

    return (
        <HomePageClient latestArticles={latestArticles} />
    );
}