"use client";

import { useState } from 'react';
import { FormField } from './base/form-field';
import { FormActions } from './base/form-actions';
import { Input } from '@/components/ui/input';
import type { User, UserFormData } from '@/types/user';

interface UserFormProps {
  initialData?: User;
  onSubmit: (data: UserFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function UserForm({ initialData, onSubmit, onCancel, isSubmitting }: UserFormProps) {
  const [formData, setFormData] = useState({
    email: initialData?.email || '',
    name: initialData?.name || '',
    role: initialData?.role || 'reader',
    bio: initialData?.bio || '',
    isActive: initialData?.isActive ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField label="Имя пользователя" required>
        <Input
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Введите имя"
          required
        />
      </FormField>

      <FormField label="Email" required>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="user@example.com"
          required
        />
      </FormField>

      <FormField label="Роль" required>
        <select
          value={formData.role}
          onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as User['role'] }))}
          className="w-full px-4 py-3 bg-white/5 border-2 border-orange-500/20 rounded-2xl text-white focus:outline-none focus:border-orange-500/50 transition-all duration-300"
        >
          <option value="reader">Читатель</option>
          <option value="author">Автор</option>
          <option value="admin">Администратор</option>
        </select>
      </FormField>

      <FormField label="Описание">
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
          className="w-full px-4 py-3 bg-white/5 border-2 border-orange-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-500/50 transition-all duration-300 resize-none"
          rows={3}
          placeholder="Краткое описание пользователя..."
        />
      </FormField>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="isActive"
          checked={formData.isActive}
          onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
          className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500 focus:ring-2"
        />
        <label htmlFor="isActive" className="text-sm font-semibold text-white">
          Активный пользователь
        </label>
      </div>

      <FormActions
        submitLabel={initialData ? 'Сохранить' : 'Создать'}
        cancelLabel="Отмена"
        onCancel={onCancel}
        isSubmitting={isSubmitting}
      />
    </form>
  );
}