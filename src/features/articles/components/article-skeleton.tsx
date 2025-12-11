export default function ArticleSkeleton({ viewMode = 'grid' }: { viewMode?: 'grid' | 'list' }) {
        if (viewMode === 'grid') {
        return (
            <div className="p-8 rounded-3xl border-2 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-orange-500/20 animate-pulse">
                <div className="flex justify-between items-start mb-6">
                    <div className="h-6 bg-gray-700 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/6"></div>
                </div>
                <div className="h-8 bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-700 rounded mb-6 w-3/4"></div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                </div>
                <div className="h-0.5 bg-gray-700 mt-4"></div>
            </div>
        );
    }

    return (
        <div className="p-8 rounded-3xl border-2 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-orange-500/20 animate-pulse">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-6 bg-gray-700 rounded w-1/6"></div>
                        <div className="h-4 bg-gray-700 rounded w-1/12"></div>
                    </div>
                    <div className="h-8 bg-gray-700 rounded mb-3"></div>
                    <div className="h-4 bg-gray-700 rounded mb-4 w-2/3"></div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                            <div className="h-4 bg-gray-700 rounded w-20"></div>
                        </div>
                    </div>
                </div>
                <div className="h-6 bg-gray-700 rounded w-16"></div>
            </div>
        </div>
    );
}