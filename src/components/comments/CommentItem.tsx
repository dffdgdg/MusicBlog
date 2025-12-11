"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, MoreHorizontal, Trash2, Edit3, Reply } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { likeCommentAction, deleteCommentAction } from '@/lib/actions/comments';
import { CommentForm } from './CommentForm';
import { useCommentsStore } from '@/stores/comments-store';
import type { BlogComment } from '@/types/comments';

interface CommentItemProps {
  comment: BlogComment;
  articleSlug: string;
  depth?: number;
}

export function CommentItem({ comment, articleSlug, depth = 0 }: CommentItemProps) {
  const [isLiking, setIsLiking] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const { updateCommentLikes, addOptimisticUpdate, removeOptimisticUpdate } = useCommentsStore();

  const canModify = user?.uid === comment.author.id || user?.role === 'admin';
  const maxDepth = 3;

  const handleLike = async () => {
    if (!isAuthenticated) return;
    
    setIsLiking(true);
    
    const currentLikes = comment.likes;
    const newLikes = currentLikes + 1;
    
    addOptimisticUpdate(comment.id, 'like');
    updateCommentLikes(comment.id, newLikes);

    try {
      await likeCommentAction(comment.id);
      removeOptimisticUpdate(comment.id);
    } catch (error) {
      console.error('Error liking comment:', error);
      updateCommentLikes(comment.id, currentLikes);
      removeOptimisticUpdate(comment.id);
    } finally {
      setIsLiking(false);
    }
  };

  const handleDelete = async () => {
    if (!canModify) return;
    
    if (confirm('Вы уверены, что хотите удалить этот комментарий?')) {
      try {
        await deleteCommentAction(comment.id);
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    }
    setIsMenuOpen(false);
  };

  const handleReplySuccess = () => {
    setIsReplying(false);
    setShowReplies(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`${depth > 0 ? 'ml-6 border-l-2 border-orange-500/20 pl-4' : ''}`}
    >
      {/* Основной комментарий */}
      <div className="bg-white/5 rounded-2xl border border-orange-500/20 p-4 mb-4">
        {/* Заголовок комментария */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {comment.author.name.charAt(0)}
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">
                {comment.author.name}
                {comment.author.role === 'admin' && (
                  <span className="ml-2 px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs border border-red-500/30">
                    Админ
                  </span>
                )}
              </h4>
              <p className="text-slate-400 text-xs">
                {new Date(comment.createdAt).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
                {comment.isEdited && ' (ред.)'}
              </p>
            </div>
          </div>

          {/* Меню действий */}
          {canModify && (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-1 text-slate-400 hover:text-white transition-colors"
              >
                <MoreHorizontal size={16} />
              </button>

              <AnimatePresence>
                {isMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsMenuOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 top-6 w-32 bg-gray-800 border border-orange-500/20 rounded-xl shadow-lg z-20 overflow-hidden"
                    >
                      <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 w-full px-3 py-2 text-red-400 hover:bg-red-500/10 transition-colors text-sm"
                      >
                        <Trash2 size={14} />
                        Удалить
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Содержание комментария */}
        <div className="text-slate-300 leading-relaxed mb-4">
          {comment.content}
        </div>

        {/* Действия */}
        <div className="flex items-center gap-4 text-sm">
          <button
            onClick={handleLike}
            disabled={isLiking || !isAuthenticated}
            className={`flex items-center gap-1 transition-colors ${
              isAuthenticated 
                ? 'text-orange-400 hover:text-orange-300' 
                : 'text-slate-500 cursor-not-allowed'
            }`}
          >
            <Heart size={16} />
            <span>{comment.likes}</span>
          </button>

          {depth < maxDepth && (
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <Reply size={16} />
              Ответить
            </button>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <MessageCircle size={16} />
              <span>
                {showReplies ? 'Скрыть' : 'Показать'} {comment.replies.length} {comment.replies.length === 1 ? 'ответ' : 'ответа'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Форма ответа */}
      <AnimatePresence>
        {isReplying && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <CommentForm
              articleSlug={articleSlug}
              parentId={comment.id}
              onCancel={() => setIsReplying(false)}
              onSuccess={handleReplySuccess}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Вложенные комментарии */}
      {comment.replies && comment.replies.length > 0 && showReplies && (
        <div className="space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              articleSlug={articleSlug}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}