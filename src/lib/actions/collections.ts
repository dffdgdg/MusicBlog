"use server";

import { adminDb } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';
import type { Collection, CollectionFormData } from '@/types/collections';

export async function getAllCollectionsAction(): Promise<Collection[]> {
  try {
    const collectionsSnapshot = await adminDb
      .collection('collections')
      .orderBy('order')
      .get();
    
    return collectionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Collection[];
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
}

export async function getCollectionBySlugAction(slug: string): Promise<Collection | null> {
  try {
    const collectionSnapshot = await adminDb
      .collection('collections')
      .where('slug', '==', slug)
      .limit(1)
      .get();
    
    if (collectionSnapshot.empty) return null;
    
    return {
      id: collectionSnapshot.docs[0].id,
      ...collectionSnapshot.docs[0].data()
    } as Collection;
  } catch (error) {
    console.error('Error fetching collection:', error);
    return null;
  }
}

export async function createCollectionAction(collectionData: CollectionFormData) {
  try {
    const slug = collectionData.slug;
    
    const collectionWithMetadata = {
      ...collectionData,
      order: Date.now(), // временный порядок
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await adminDb.collection('collections').doc(slug).set(collectionWithMetadata);
    
    revalidatePath('/');
    revalidatePath('/collections');
    
    return { success: true, message: 'Коллекция создана' };
  } catch (error) {
    console.error('Error creating collection:', error);
    return { success: false, message: 'Ошибка создания коллекции' };
  }
}