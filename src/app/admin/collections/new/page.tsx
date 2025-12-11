"use client";

import { CollectionForm } from '@/components/forms/collection-form';
import { createCollectionAction } from '@/lib/actions/collections';
import { useRouter } from 'next/navigation';

export default function NewCollectionPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    const result = await createCollectionAction(data);
    
    if (result.success) {
      router.push('/admin/collections');
      router.refresh();
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Новая коллекция</h1>
        <p className="text-slate-400">Создайте тематическую подборку статей</p>
      </div>

      <div className="bg-white/5 rounded-3xl p-8 border border-orange-500/20">
        <CollectionForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}