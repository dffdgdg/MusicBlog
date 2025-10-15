// Файл: src/app/not-found.tsx

import Link from 'next/link';
import { Compass, Home, BookOpen } from 'lucide-react';

export default function NotFoundPage() {
    return (
        <main className="pt-24 md:pt-32 container mx-auto px-6 py-12 flex items-center justify-center text-center">
            <div className="max-w-2xl">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-500/10 mb-8">
                    <Compass size={40} className="text-orange-400" />
                </div>
                
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-4">
                    Страница не найдена
                </h1>
                
                <p className="text-lg text-gray-400 mb-12">
                    Упс! Похоже, вы сбились с пути. Но не волнуйтесь, мы поможем вам найти дорогу обратно.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link 
                        href="/" 
                        className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold transition-colors"
                    >
                        <Home size={20} />
                        <span>На главную</span>
                    </Link>
                    <Link 
                        href="/articles" 
                        className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 font-bold transition-colors"
                    >
                        <BookOpen size={20} />
                        <span>Ко всем статьям</span>
                    </Link>
                </div>
            </div>
        </main>
    );
}