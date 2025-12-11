export interface BlogComment {
  id: string;
  articleSlug: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    role: 'admin' | 'author' | 'reader';
  };
  content: string;
  createdAt: string;
  updatedAt?: string;
  likes: number;
  isEdited: boolean;
  parentId?: string;
  replies?: BlogComment[];
  status: 'approved' | 'pending' | 'spam';
}

export interface CommentFormData {
  content: string;
  parentId?: string;
}

export interface CommentStats {
  totalComments: number;
  approvedComments: number;
  pendingComments: number;
}