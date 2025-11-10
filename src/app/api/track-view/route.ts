import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
    try {
        const contentType = request.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
            return NextResponse.json(
                { success: false, message: 'Content-Type must be application/json' },
                { status: 400 }
            );
        }

        let slug: string;
        try {
            const body = await request.json();
            slug = body.slug;
        } catch (parseError) {
            return NextResponse.json(
                { success: false, message: 'Invalid JSON body' },
                { status: 400 }
            );
        }
        
        if (!slug || typeof slug !== 'string') {
            return NextResponse.json(
                { success: false, message: 'Valid slug is required' },
                { status: 400 }
            );
        }

        console.log(`Tracking view for article: ${slug}`);

        const hasViewed = request.cookies.get(`viewed_${slug}`);
        
        if (hasViewed) {
            console.log(`View already counted for article: ${slug}`);
            return NextResponse.json({ 
                success: true, 
                message: 'View already counted',
                alreadyCounted: true
            });
        }

        const articleRef = adminDb.collection('articles').doc(slug);
        const articleDoc = await articleRef.get();
        
        if (!articleDoc.exists) {
            console.log(`Article not found: ${slug}`);
            return NextResponse.json(
                { success: false, message: 'Article not found' }, 
                { status: 404 }
            );
        }

        const currentViews = articleDoc.data()?.views || 0;
        const newViews = currentViews + 1;

        console.log(`Updating views for ${slug}: ${currentViews} -> ${newViews}`);

        await articleRef.update({
            views: newViews,
            lastViewed: new Date().toISOString()
        });

        const response = NextResponse.json({ 
            success: true, 
            message: 'View counted successfully',
            newViews,
            slug
        });

        response.cookies.set(`viewed_${slug}`, 'true', {
            maxAge: 60 * 60 * 24, // 24 часа
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });

        console.log(`View counted for article: ${slug}, new total: ${newViews}`);
        return response;

    } catch (error) {
        console.error('Error tracking view:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: 'Internal server error',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}