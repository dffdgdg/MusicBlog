// Файл: src/components/AdminArticleControls.tsx

"use client";
import { NavigationService } from '@/lib/navigation';
import { useState } from 'react';
import { Trash2, MoreVertical, Edit, Eye, Copy, Archive } from 'lucide-react';
import { deleteArticleAction } from '@/lib/actions';
import { useRouter } from 'next/navigation';

interface AdminArticleControlsProps {
    slug: string;
}

export default function AdminArticleControls({ slug }: AdminArticleControlsProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();
    const handleDelete = async () => {
        if (!confirm('Вы уверены, что хотите удалить эту статью?')) {
            return;
        }

        setIsDeleting(true);
        try {
            const result = await deleteArticleAction(slug);
            if (result.success) {
                const redirectPath = NavigationService.getArticleDeleteRedirect(window.location.pathname);
                router.push(redirectPath);
            }
            else {
                alert('Ошибка при удалении: ' + result.message);
            }
        } 
        catch
        {
            alert('Произошла ошибка при удалении');
        } finally {
            setIsDeleting(false);
            setIsMenuOpen(false);
        }
    };

    const copyLink = () => {
        const link = `${window.location.origin}/articles/${slug}`;
        navigator.clipboard.writeText(link);
        alert('Ссылка скопирована в буфер обмена');
        setIsMenuOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                disabled={isDeleting}
            >
                <MoreVertical className="w-5 h-5" />
            </button>

            {isMenuOpen && (
                <>
                    {/* Overlay */}
                    <div 
                        className="fixed inset-0 z-10"
                        onClick={() => setIsMenuOpen(false)}
                    />
                    
                    {/* Menu */}
                    <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 border border-orange-500/20 rounded-2xl shadow-2xl z-20 overflow-hidden">
                        <div className="p-2 space-y-1">
                            <button
                                onClick={copyLink}
                                className="flex items-center gap-3 w-full px-3 py-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                            >
                                <Copy className="w-4 h-4" />
                                Копировать ссылку
                            </button>

                            <a
                                href={`/articles/${slug}`}
                                target="_blank"
                                className="flex items-center gap-3 w-full px-3 py-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                            >
                                <Eye className="w-4 h-4" />
                                Просмотреть
                            </a>

                            <a
                                href={`/admin/edit/${slug}`}
                                className="flex items-center gap-3 w-full px-3 py-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                            >
                                <Edit className="w-4 h-4" />
                                Редактировать
                            </a>

                            <button
                                onClick={() => {/* TODO: Archive functionality */}}
                                className="flex items-center gap-3 w-full px-3 py-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                            >
                                <Archive className="w-4 h-4" />
                                В архив
                            </button>

                            <div className="border-t border-white/10 my-1"></div>

                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex items-center gap-3 w-full px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200 disabled:opacity-50"
                            >
                                <Trash2 className="w-4 h-4" />
                                {isDeleting ? 'Удаление...' : 'Удалить'}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}