// src/components/shared/ui/PageLoader.tsx
export default function PageLoader() {
    return (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-orange-400 font-semibold">Загрузка...</p>
            </div>
        </div>
    );
}