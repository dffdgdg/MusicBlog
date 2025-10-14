import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 output: 'export', // Говорим Next.js генерировать статические HTML-файлы
    images: {
        unoptimized: true, // Отключаем оптимизацию изображений Next.js, она не работает в статике
    },
};

export default nextConfig;
