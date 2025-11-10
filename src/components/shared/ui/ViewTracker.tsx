"use client";

import { useEffect } from 'react';

interface ViewTrackerProps {
    slug: string;
}

export function ViewTracker({ slug }: ViewTrackerProps) {
    useEffect(() => {
        const trackView = async () => {
            if (!slug) {
                console.warn('No slug provided for view tracking');
                return;
            }

            try {
                console.log(`Sending view tracking request for: ${slug}`);
                
                const response = await fetch('/api/track-view', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ slug }),
                });

                // Проверяем, что ответ является JSON
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    const text = await response.text();
                    console.error('Non-JSON response from API:', text);
                    throw new Error(`Expected JSON, got: ${contentType}`);
                }

                const data = await response.json();
                
                if (data.success) {
                    console.log(`✅ View tracked successfully for: ${slug}`, data);
                } else {
                    console.warn('❌ Failed to track view:', data.message, data);
                }
            } catch (error) {
                console.error('🚨 Error tracking view:', error);
            }
        };

        // Добавляем небольшую задержку для уверенности, что страница загрузилась
        const timer = setTimeout(trackView, 100);
        
        return () => clearTimeout(timer);
    }, [slug]);

    return null; // Этот компонент не рендерит ничего видимого
}