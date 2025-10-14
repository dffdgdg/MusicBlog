// Файл: src/app/add-article/page.tsx

"use client";

import { useState } from 'react';
import { createArticleAction } from '@/lib/actions';
import type { Article, ContentBlock } from '@/lib/data';
import { Type, Pilcrow, MessageSquareQuote, List, Youtube, Trash2 } from 'lucide-react';

// --- Вспомогательный компонент для иконок ---
const BlockIcon = ({ type }: { type: ContentBlock['type'] }) => {
    const iconProps = { size: 20, className: 'text-gray-400' };
    switch (type) {
        case 'heading': return <Type {...iconProps} />;
        case 'paragraph': return <Pilcrow {...iconProps} />;
        case 'quote': return <MessageSquareQuote {...iconProps} />;
        case 'list': return <List {...iconProps} />;
        case 'youtube': return <Youtube {...iconProps} />;
        default: return null;
    }
};

// --- Основной компонент страницы ---
export default function AddArticlePage() {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [category, setCategory] = useState('Сведение');
    const [content, setContent] = useState<ContentBlock[]>([]);
    const [status, setStatus] = useState({ message: '', isError: false });

    // ... (функции handleTitleChange, handleContentChange, handleFormSubmit остаются без изменений) ...
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        // Транслитерация + очистка
        const newSlug = newTitle.toLowerCase().replace(/а/g, 'a').replace(/б/g, 'b').replace(/в/g, 'v').replace(/г/g, 'g').replace(/д/g, 'd').replace(/е/g, 'e').replace(/ё/g, 'e').replace(/ж/g, 'zh').replace(/з/g, 'z').replace(/и/g, 'i').replace(/й/g, 'y').replace(/к/g, 'k').replace(/л/g, 'l').replace(/м/g, 'm').replace(/н/g, 'n').replace(/о/g, 'o').replace(/п/g, 'p').replace(/р/g, 'r').replace(/с/g, 's').replace(/т/g, 't').replace(/у/g, 'u').replace(/ф/g, 'f').replace(/х/g, 'h').replace(/ц/g, 'c').replace(/ч/g, 'ch').replace(/ш/g, 'sh').replace(/щ/g, 'sch').replace(/ъ/g, '').replace(/ы/g, 'y').replace(/ь/g, '').replace(/э/g, 'e').replace(/ю/g, 'yu').replace(/я/g, 'ya').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        setSlug(newSlug);
    };

    const addContentBlock = (type: ContentBlock['type']) => {
        const newBlock = type === 'list' ? { type, items: [''] } : type === 'quote' ? { type, text: '', author: '' } : type === 'youtube' ? { type, videoId: '', caption: '' } : { type, text: '' };
        setContent([...content, newBlock]);
    };

    const removeContentBlock = (indexToRemove: number) => {
        setContent(content.filter((_, index) => index !== indexToRemove));
    };
    
    const handleContentChange = (index: number, field: string, value: string | string[]) => {
        const newContent = [...content];
        (newContent[index] as any)[field] = value;
        setContent(newContent);
    };

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setStatus({ message: 'Сохранение...', isError: false });
        const newArticle: Article = { title, slug, category, content, author: { name: "Admin", avatarUrl: "/images/author.jpg" }, publishedDate: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }), readingTime: Math.ceil(JSON.stringify(content).length / 1500), relatedArticles: [] };
        const result = await createArticleAction(newArticle);
        setStatus({ message: result.message, isError: !result.success });
        if (result.success) { setTitle(''); setSlug(''); setContent([]); setCategory('Сведение'); }
    };

    const blockTypes = [
        { type: 'heading', label: 'Заголовок' }, { type: 'paragraph', label: 'Параграф' },
        { type: 'quote', label: 'Цитата' }, { type: 'list', label: 'Список' }, { type: 'youtube', label: 'YouTube' }
    ] as const;

    return (
        <main className="pt-24 md:pt-32 container mx-auto px-6 py-12">
            <header className="mb-12">
                <h1 className="text-5xl font-extrabold tracking-tighter text-white">
                    Создать новую статью
                </h1>
            </header>
            
            <form onSubmit={handleFormSubmit} className="space-y-8 max-w-4xl mx-auto">
                {/* --- Основные поля --- */}
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 space-y-6">
                    <h2 className="text-2xl font-bold text-white">Основные данные</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Заголовок</label>
                        <input type="text" value={title} onChange={handleTitleChange} className="input-style" required />
                        {slug && (
                            <div className="mt-2 text-sm text-gray-400">
                                <span className="font-semibold">URL:</span>
                                <code className="ml-2 bg-gray-700/50 text-orange-300 py-1 px-2 rounded-md">/articles/{slug}</code>
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Категория</label>
                        <input type="text" value={category} onChange={e => setCategory(e.target.value)} className="input-style" required />
                    </div>
                </div>

                {/* --- Конструктор контента --- */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white mb-4">Конструктор контента</h2>
                    {content.map((block, index) => (
                        <div key={index} className="rounded-2xl border border-white/10 bg-white/5">
                           <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-t-2xl border-b border-white/10">
                                <div className="flex items-center gap-3">
                                    <BlockIcon type={block.type} />
                                    <span className="font-semibold text-sm text-gray-300 capitalize">{block.type}</span>
                                </div>
                                <button type="button" onClick={() => removeContentBlock(index)} className="p-1 text-gray-500 hover:text-red-500 transition-colors">
                                    <Trash2 size={18} />
                                </button>
                           </div>
                           <div className="p-4 space-y-3">
                                { (block.type === 'paragraph' || block.type === 'heading') &&
                                    <textarea value={block.text} onChange={e => handleContentChange(index, 'text', e.target.value)} className="input-style h-24" placeholder="Текст..." /> }
                                { block.type === 'quote' && <>
                                    <input type="text" value={block.text} placeholder="Текст цитаты..." onChange={e => handleContentChange(index, 'text', e.target.value)} className="input-style" />
                                    <input type="text" value={block.author} placeholder="Автор..." onChange={e => handleContentChange(index, 'author', e.target.value)} className="input-style" />
                                </>}
                                { block.type === 'youtube' && <>
                                    <input type="text" value={block.videoId} placeholder="YouTube Video ID (например, s_4iA4bB45k)" onChange={e => handleContentChange(index, 'videoId', e.target.value)} className="input-style" />
                                    <input type="text" value={block.caption} placeholder="Подпись к видео..." onChange={e => handleContentChange(index, 'caption', e.target.value)} className="input-style" />
                                </>}
                                { block.type === 'list' && 
                                    <textarea value={block.items.join('\n')} placeholder="Каждый пункт с новой строки..." onChange={e => handleContentChange(index, 'items', e.target.value.split('\n'))} className="input-style h-24" /> }
                           </div>
                        </div>
                    ))}
                </div>
                
                {/* --- Новая панель добавления --- */}
                <div className="p-4 rounded-2xl border border-dashed border-white/20 text-center">
                    <p className="text-sm text-gray-400 mb-4">Добавить новый блок</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                        {blockTypes.map(b => (
                             <button key={b.type} type="button" onClick={() => addContentBlock(b.type)} className="btn-adder">
                                 <BlockIcon type={b.type} />
                                 <span>{b.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- Отправка --- */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <button type="submit" className="btn-primary">
                        Опубликовать статью
                    </button>
                    {status.message && (
                        <p className={`font-semibold ${status.isError ? 'text-red-500' : 'text-green-500'}`}>
                            {status.message}
                        </p>
                    )}
                </div>
            </form>
        </main>
    );
}