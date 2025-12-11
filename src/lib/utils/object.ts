export function removeUndefinedFields<T extends Record<string, any>>(obj: T): T {
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
    return obj.map(deepRemoveUndefined) as any;
  }
  
  const cleaned = {} as T;
  
  Object.keys(obj as any).forEach(key => {
    const value = (obj as any)[key];
    if (value !== undefined) {
      (cleaned as any)[key] = deepRemoveUndefined(value);
    }
  });
  
  return cleaned;
}