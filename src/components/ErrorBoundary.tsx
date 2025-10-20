// Файл: src/components/ErrorBoundary.tsx
"use client";

import { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = { hasError: false };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: any) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    private handleRetry = () => {
        this.setState({ hasError: false, error: undefined });
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                    <div className="text-center p-8 max-w-md">
                        <div className="w-20 h-20 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle className="w-10 h-10 text-red-400" />
                        </div>
                        
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Что-то пошло не так
                        </h2>
                        
                        <p className="text-slate-400 mb-6">
                            {this.state.error?.message || 'Произошла непредвиденная ошибка'}
                        </p>

                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={this.handleRetry}
                                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl transition-colors"
                            >
                                <RefreshCw size={16} />
                                Попробовать снова
                            </button>
                            
                            <Link
                                href="/"
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl transition-colors"
                            >
                                <Home size={16} />
                                На главную
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}