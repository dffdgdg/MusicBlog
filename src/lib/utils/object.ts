// ИСПРАВЛЕННАЯ ВЕРСИЯ
export function removeUndefinedFields<T extends Record<string, unknown>>(obj: T): T {
  const cleaned = { ...obj };
  
  Object.keys(cleaned).forEach(key => {
    if (cleaned[key] === undefined) {
      delete cleaned[key];
    }
  });
  
  return cleaned;
}

export function deepRemoveUndefined<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(deepRemoveUndefined) as T;
  }
  
  const cleaned: Record<string, unknown> = {};
  
  Object.keys(obj as Record<string, unknown>).forEach(key => {
    const value = (obj as Record<string, unknown>)[key];
    if (value !== undefined) {
      cleaned[key] = deepRemoveUndefined(value);
    }
  });
  
  return cleaned as T;
}