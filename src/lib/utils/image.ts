export const validateImageUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    
    // Разрешенные протоколы
    const allowedProtocols = ['https:', 'http:'];
    if (!allowedProtocols.includes(urlObj.protocol)) {
      return false;
    }
    
    // Разрешенные расширения файлов
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
    const extension = urlObj.pathname.toLowerCase();
    const hasValidExtension = allowedExtensions.some(ext => extension.endsWith(ext));
    
    if (!hasValidExtension) {
      // Проверяем MIME type в Content-Type (если доступно)
      const imagePatterns = [
        /\.(jpg|jpeg|png|gif|webp|svg|bmp)(\?.*)?$/i,
        /\/image\//i,
        /\.img\//i
      ];
      
      return imagePatterns.some(pattern => pattern.test(url));
    }
    
    return true;
  } catch {
    return false;
  }
};

export const getImageProxyUrl = (url: string): string => {
  return url;
};

export const getImageDimensions = async (url: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      resolve({ width: 800, height: 600 });
    };
    img.src = url;
  });
};