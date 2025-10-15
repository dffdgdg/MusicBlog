// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import GlobalParallaxBackground from "@/components/GlobalParallaxBackground";
import { getAllArticles } from "@/lib/data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project Title",
  description: "Ваша интерактивная студия знаний о создании музыки",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const allArticlesForSearch = await getAllArticles();

  return (
    <html lang="ru">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <GlobalParallaxBackground />
        <div className="flex flex-col min-h-screen">
          <Header articles={allArticlesForSearch} />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
