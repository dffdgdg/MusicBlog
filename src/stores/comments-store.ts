import { create } from 'zustand';
import type { BlogComment } from '@/types/comments';

interface CommentsStore {
  comments: BlogComment[];
  optimisticUpdates: Map<string, 'like' | 'comment'>;
  
  setComments: (comments: BlogComment[]) => void;
  addComment: (comment: BlogComment) => void;
  updateCommentLikes: (commentId: string, newLikes: number) => void;
  addOptimisticUpdate: (id: string, type: 'like' | 'comment') => void;
  removeOptimisticUpdate: (id: string) => void;
}

export const useCommentsStore = create<CommentsStore>((set, get) => ({
  comments: [],
  optimisticUpdates: new Map(),
  
  setComments: (comments) => set({ comments }),
  
  addComment: (comment) => set((state) => ({
    comments: [comment, ...state.comments]
  })),
  
  updateCommentLikes: (commentId, newLikes) => set((state) => ({
    comments: state.comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: newLikes }
        : comment
    )
  })),
  
  addOptimisticUpdate: (id, type) => set((state) => {
    const newUpdates = new Map(state.optimisticUpdates);
    newUpdates.set(id, type);
    return { optimisticUpdates: newUpdates };
  }),
  
  removeOptimisticUpdate: (id) => set((state) => {
    const newUpdates = new Map(state.optimisticUpdates);
    newUpdates.delete(id);
    return { optimisticUpdates: newUpdates };
  }),
}));