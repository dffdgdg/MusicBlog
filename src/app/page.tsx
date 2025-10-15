// Файл: src/app/page.tsx (Серверный компонент)

import { getAllArticles } from "@/lib/data";
import HomePageClient from "@/components/HomePageClient"; 

export default async function HomePage() {
    // 1. Получаем данные на сервере
    const allArticles = await getAllArticles();

    const latestArticles = allArticles; 

    return (
        // 2. Передаем данные в клиентский компонент для отображения
        <HomePageClient latestArticles={latestArticles} />
    );
}