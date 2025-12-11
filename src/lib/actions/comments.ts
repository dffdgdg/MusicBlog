"use server";

import { adminDb } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import type { Comment, CommentFormData } from '@/types/comments';

async function updateArticleCommentStats(articleSlug: string) {
  try {
    const commentsSnapshot = await adminDb
      .collection('comments')
      .where('articleSlug', '==', articleSlug)
      .where('status', '==', 'approved')
      .get();

    const totalComments = commentsSnapshot.size;

    await adminDb
      .collection('articles')
      .doc(articleSlug)
      .update({
        'stats.commentsCount': totalComments,
        'stats.lastCommentAt': new Date().toISOString(),
      });

    console.log(`✅ Статистика комментариев обновлена для ${articleSlug}: ${totalComments} комментариев`);
  } catch (error) {
    console.error("❌ Ошибка при обновлении статистики комментариев:", error);
  }
}

// В src/lib/actions/comments.ts - ОБНОВЛЯЕМ createCommentAction
export async function createCommentAction(articleSlug: string, formData: CommentFormData) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return { success: false, message: "Требуется авторизация" };
    }

    const content = formData.content.trim();
    if (!content) {
      return { success: false, message: "Комментарий не может быть пустым" };
    }

    const commentId = Math.random().toString(36).substr(2, 9);
    
    const comment: Comment = {
      id: commentId,
      articleSlug,
      author: {
        id: user.id,
        name: user.name,
        role: user.role,
        ...(user.avatar && { avatar: user.avatar })
      },
      content: content,
      createdAt: new Date().toISOString(),
      likes: 0,
      isEdited: false,
      status: 'approved',
      replies: [],
    };

    if (formData.parentId) {
      comment.parentId = formData.parentId;
    }

    await adminDb.collection('comments').doc(commentId).set(comment, {
      ignoreUndefinedProperties: true
    });

    await updateArticleCommentStats(articleSlug);
    revalidatePath(`/articles/${articleSlug}`);
    
    return { 
      success: true, 
      message: "Комментарий опубликован",
      comment: comment 
    };

  } catch (error) {
    console.error("?? Ошибка при создании комментария:", error);
    return { 
      success: false, 
      message: "Произошла ошибка при отправке комментария" 
    };
  }
}

export async function getArticleCommentsAction(articleSlug: string): Promise<Comment[]> {
  try {
    console.log(`?? [DEBUG] Запрос комментариев для статьи: ${articleSlug}`);
    
    const commentsSnapshot = await adminDb
      .collection('comments')
      .where('articleSlug', '==', articleSlug)
      .where('status', '==', 'approved')
      .orderBy('createdAt', 'asc')
      .get();

    console.log(`?? [DEBUG] Найдено документов: ${commentsSnapshot.size}`);
    
    const comments = commentsSnapshot.docs.map(doc => {
      const data = doc.data();
      console.log(`?? [DEBUG] Комментарий ${doc.id}:`, {
        id: data.id,
        articleSlug: data.articleSlug,
        content: data.content,
        status: data.status,
        author: data.author
      });
      return data as Comment;
    });
    
    const tree = buildCommentTree(comments);
    console.log(`?? [DEBUG] Построено дерево комментариев: ${tree.length} корневых`);
    
    return tree;
  } catch (error) {
    console.error("?? [ERROR] Ошибка при получении комментариев:", error);
    return [];
  }
}

export async function likeCommentAction(commentId: string) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, message: "Требуется авторизация" };
    }

    const commentRef = adminDb.collection('comments').doc(commentId);
    const commentDoc = await commentRef.get();

    if (!commentDoc.exists) {
      return { success: false, message: "Комментарий не найден" };
    }

    const likesSnapshot = await adminDb
      .collection('commentLikes')
      .where('commentId', '==', commentId)
      .where('userId', '==', user.id)
      .get();

    if (!likesSnapshot.empty) {
      return { success: false, message: "Вы уже оценили этот комментарий" };
    }

    await adminDb.collection('commentLikes').add({
      commentId,
      userId: user.id,
      createdAt: new Date().toISOString(),
    });

    const currentLikes = commentDoc.data()?.likes || 0;
    await commentRef.update({
      likes: currentLikes + 1,
    });

    return { success: true, message: "Спасибо за вашу оценку!" };

  } catch (error) {
    console.error("Ошибка при лайке комментария:", error);
    return { success: false, message: "Произошла ошибка" };
  }
}

export async function deleteCommentAction(commentId: string) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, message: "Требуется авторизация" };
    }

    const commentRef = adminDb.collection('comments').doc(commentId);
    const commentDoc = await commentRef.get();

    if (!commentDoc.exists) {
      return { success: false, message: "Комментарий не найден" };
    }

    const comment = commentDoc.data() as Comment;

    if (comment.author.id !== user.id && user.role !== 'admin') {
      return { success: false, message: "Недостаточно прав для удаления" };
    }

    await commentRef.delete();

    await updateArticleCommentStats(comment.articleSlug);

    revalidatePath(`/articles/${comment.articleSlug}`);

    return { success: true, message: "Комментарий удален" };

  } catch (error) {
    console.error("Ошибка при удалении комментария:", error);
    return { success: false, message: "Произошла ошибка при удалении" };
  }
}

function buildCommentTree(comments: Comment[]): Comment[] {
  const commentMap = new Map<string, Comment>();
  const rootComments: Comment[] = [];

  comments.forEach(comment => {
    commentMap.set(comment.id, { ...comment, replies: [] });
  });

  comments.forEach(comment => {
    if (comment.parentId) {
      const parent = commentMap.get(comment.parentId);
      if (parent) {
        parent.replies!.push(commentMap.get(comment.id)!);
      }
    } else {
      rootComments.push(commentMap.get(comment.id)!);
    }
  });

  return rootComments;
}