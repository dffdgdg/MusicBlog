"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { createCommentAction } from '@/lib/actions/comments';
import { AuthModal } from '@/components/auth/AuthModal';
import { BlogComment } from '@/types/comments';

interface CommentFormProps {
  articleSlug: string;
  parentId?: string;
  onCancel?: () => void;
  onSuccess?: (newComment: BlogComment) => void;
}

export function CommentForm({ articleSlug, parentId, onCancel, onSuccess }: CommentFormProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ message: string; isError: boolean } | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { isAuthenticated, user } = useAuthStore();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  console.log("?? Начало отправки комментария", {
    isAuthenticated,
    user: user?.name,
    contentLength: content.length,
    articleSlug
  });
  
  if (!isAuthenticated) {
    console.log("?? Пользователь не авторизован, открываем модалку");
    setIsAuthModalOpen(true);
    return;
  }

  if (!content.trim()) {
    setStatus({ message: "Комментарий не может быть пустым", isError: true });
    return;
  }

  if (content.trim().length > 1000) {
    setStatus({ message: "Комментарий не должен превышать 1000 символов", isError: true });
    return;
  }

  setIsSubmitting(true);
  setStatus(null);

  interface OptimisticComment extends Omit<BlogComment, 'id' | 'createdAt'> {
  id: string;
  createdAt: string;
}

const optimisticComment: BlogComment = {
  id: `optimistic-${Date.now()}`,
  articleSlug,
  author: {
    id: user!.uid,
    name: user!.name,
    role: user!.role,
  },
  content: content.trim(),
  createdAt: new Date().toISOString(),
  likes: 0,
  isEdited: false,
  status: 'approved',
  replies: [],
  parentId: parentId,
};

  try {
    console.log("?? Вызов Server Action...", {
      articleSlug,
      content: content.trim(),
      parentId,
      user: user?.name
    });

    const result = await createCommentAction(articleSlug, {
      content: content.trim(),
      parentId,
    });

    console.log("?? Результат Server Action:", result);

    if (result.success) {
      setContent('');
      setStatus({ message: result.message, isError: false });
      
      onSuccess?.(optimisticComment);
      
      setTimeout(() => {
        setStatus(null);
      }, 1000);
    } else {
      setStatus({ message: result.message, isError: true });
    }
  } catch (error) {
    console.error("? Ошибка в handleSubmit:", error);
    setStatus({ 
      message: `Ошибка отправки: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`, 
      isError: true 
    });
  } finally {
    setIsSubmitting(false);
  }
};

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit(e);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 rounded-2xl border border-orange-500/20 p-6 mb-6"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="comment" className="block text-sm font-semibold text-white mb-2">
              {parentId ? 'Ответ на комментарий' : 'Ваш комментарий'}
            </label>
            <textarea
              ref={textareaRef}
              id="comment"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isAuthenticated 
                  ? "Напишите ваш комментарий... (Ctrl+Enter для отправки)"
                  : "Войдите, чтобы оставить комментарий..."
              }
              disabled={!isAuthenticated || isSubmitting}
              className="w-full h-24 px-4 py-3 bg-black/20 border border-orange-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors resize-none disabled:opacity-50"
              maxLength={1000}
            />
            <div className="flex justify-between items-center mt-1">
              <span className="text-slate-400 text-sm">
                {content.length}/1000
              </span>
              {!isAuthenticated && (
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="text-orange-400 hover:text-orange-300 text-sm font-semibold"
                >
                  Войти для комментирования
                </button>
              )}
            </div>
          </div>

          <AnimatePresence>
            {status && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex items-center gap-3 p-3 rounded-xl border ${
                  status.isError
                    ? 'bg-red-500/20 border-red-500/30 text-red-400'
                    : 'bg-green-500/20 border-green-500/30 text-green-400'
                }`}
              >
                {status.isError ? <AlertCircle size={16} /> : <Send size={16} />}
                <span className="text-sm">{status.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between items-center">
            <div className="flex gap-3 ml-auto">
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
                >
                  <X size={16} />
                  Отмена
                </button>
              )}
              
              <button
                type="submit"
                disabled={!content.trim() || isSubmitting || !isAuthenticated}
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-400 hover:to-purple-400 disabled:opacity-50 text-white font-semibold px-6 py-2 rounded-xl transition-all duration-300"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send size={16} />
                )}
                {parentId ? 'Ответить' : 'Отправить'}
              </button>
            </div>
          </div>
        </form>
      </motion.div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}