"use client";

import { useEffect, useState } from 'react';

interface ViewTrackerProps {
    slug: string;
    onViewCounted?: (newViews: number) => void;
}

export function ViewTracker({ slug, onViewCounted }: ViewTrackerProps) {
    const [isTracked, setIsTracked] = useState(false);

    useEffect(() => {
        const trackView = async () => {
            if (isTracked || !slug) return;

            try {
                const response = await fetch('/api/track-view', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ slug }),
                });

                const data = await response.json();
                
                if (data.success) {
                    setIsTracked(true);
                    
                    // Вызываем колбэк для обновления UI
                    if (onViewCounted && data.newViews) {
                        onViewCounted(data.newViews);
                    }
                    
                    window.dispatchEvent(new CustomEvent('views-updated', {
                        detail: { slug, views: data.newViews }
                    }));
                }
            } catch (error) {
                console.error('Error tracking view:', error);
            }
        };

        const timer = setTimeout(trackView, 100);
        
        return () => clearTimeout(timer);
    }, [slug, isTracked, onViewCounted]);

    return null;
}