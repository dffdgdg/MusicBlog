import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const selectOnly = searchParams.get('select') === 'true';
    
    let query = adminDb.collection('collections').orderBy('title');
    
    if (selectOnly) {
      // Для выпадающего списка возвращаем только нужные поля
      const snapshot = await query.get();
      const collections = snapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description || '',
        articles: doc.data().articles || []
      }));
      
      return NextResponse.json(collections);
    }
    
    // Полный список коллекций
    const snapshot = await query.get();
    const collections = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return NextResponse.json(collections);
  } catch (error) {
    console.error('Error fetching collections:', error);
    return NextResponse.json(
      { error: 'Failed to fetch collections' },
      { status: 500 }
    );
  }
}