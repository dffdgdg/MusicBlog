// Файл: src/components/AdminArticleControls.tsx
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteArticleAction } from '@/lib/actions';
import { Pencil, Trash2 } from 'lucide-react';

export default function AdminArticleControls({ slug }: { slug: string }) {
    const router = useRouter();

    const handleDelete = async () => {
        if (window.confirm("Вы уверены, что хотите удалить эту статью?")) {
            const result = await deleteArticleAction(slug);
            if (result.success) {
                // Вместо управления состоянием, просто говорим Next.js обновить страницу
                router.refresh(); 
            } else {
                alert(result.message);
            }
        }
    };

    return (
        <div className="flex gap-3">
            <Link href={`/admin/edit/${slug}`} className="p-2 text-gray-400 hover:text-cyan-400 transition-colors">
                <Pencil size={18} />
            </Link>
            <button onClick={handleDelete} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 size={18} />
            </button>
        </div>
    );
}