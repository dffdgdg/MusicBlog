import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { getAllArticlesAction } from "@/lib/actions/articles";
import { ErrorBoundary } from '@/components/shared/ui/ErrorBoundary';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "СоздайМузыку",
  description: "Ваша интерактивная студия знаний о создании музыки",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const allArticlesForSearch = await getAllArticlesAction();

  return (
    <html lang="ru">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <div className="flex flex-col min-h-screen">
          <ErrorBoundary>
            <Header articles={allArticlesForSearch} />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <ScrollToTop />
          </ErrorBoundary>
        </div>
      </body>
    </html>
  );
}