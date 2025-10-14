// Файл: src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/header";
import { getAllArticles } from "@/lib/data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Music Craft", // Я вернул наше название, вы можете поменять его обратно
  description: "Ваша интерактивная студия знаний о создании музыки",
};

// 3. Превращаем компонент в асинхронный (async), чтобы использовать await
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 4. Получаем все статьи на сервере ОДИН РАЗ при загрузке любой страницы
  const allArticlesForSearch = await getAllArticles();

  return (
    <html lang="ru">
      <body className={inter.className}>
        <div className="relative min-h-screen w-full overflow-x-hidden bg-gray-900 text-white">
          <div className="absolute top-0 left-0 h-[40rem] w-[40rem] bg-orange-500/20 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] bg-cyan-500/20 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2"></div>
          
          {/* 5. Передаем полученные статьи в Header как пропс */}
          <Header articles={allArticlesForSearch} />

          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}