"use client";

import { useState, useEffect } from 'react';
import { MessageCircle, Loader } from 'lucide-react';
import { CommentForm } from './CommentForm';
import { CommentItem } from './CommentItem';
import { getArticleCommentsAction } from '@/lib/actions/comments';
import { useCommentsStore } from '@/stores/comments-store';
import type { BlogComment } from '@/types/comments';

interface CommentsSectionProps 
{
  articleSlug: string;
}

export function CommentsSection({ articleSlug }: CommentsSectionProps) {
  const { comments, setComments, addComment } = useCommentsStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadComments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log(`?? Загрузка комментариев для: ${articleSlug}`);
      
      const commentsData = await getArticleCommentsAction(articleSlug);
      console.log(`?? Загружено комментариев: ${commentsData.length}`);
      
      setComments(commentsData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
      console.error('?? Ошибка загрузки комментариев:', err);
      setError(`Не удалось загрузить комментарии: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [articleSlug]);

 const handleCommentSuccess = (newComment: BlogComment) => {
    addComment(newComment);
    loadComments();
  };

  return (
    <section className="mt-16">
      {/* Заголовок */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-orange-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">
            Комментарии
            {comments.length > 0 && (
              <span className="text-orange-400 ml-2">({comments.length})</span>
            )}
          </h2>
          <p className="text-slate-400">Обсуждайте статью с сообществом</p>
        </div>
      </div>

      {/* Форма добавления комментария */}
      <div className="mb-8">
        <CommentForm 
          articleSlug={articleSlug} 
          onSuccess={(newComment) => handleCommentSuccess(newComment)}
        />
      </div>

      {/* Список комментариев */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader className="w-6 h-6 text-orange-400 animate-spin" />
          </div>  
        ) : error ? (
        <div className="text-center py-8 text-red-400">
          {error}
          </div>
          ) : comments.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            Пока нет комментариев. Будьте первым!
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              articleSlug={articleSlug}
            />
          ))
        )}
      </div>
    </section>
  );
}