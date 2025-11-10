"use client";

import { useEffect } from 'react';

export function useTrackView(slug: string) {
    useEffect(() => {
        const trackView = async () => {
            try {
                const response = await fetch('/api/track-view', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ slug }),
                });

                const data = await response.json();
                
                if (data.success) {
                    console.log(`View tracked for article: ${slug}`);
                } else {
                    console.warn('Failed to track view:', data.message);
                }
            } catch (error) {
                console.error('Error tracking view:', error);
            }
        };

        trackView();
    }, [slug]);
}