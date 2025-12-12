import { admin, adminDb } from '@/lib/firebase-admin';

export async function checkRateLimit(email: string, ip: string): Promise<boolean> {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; 
  const maxAttempts = 5;
  
  const attemptsRef = adminDb.collection('authAttempts').doc(`${email}_${ip}`);
  const doc = await attemptsRef.get();
  
  if (!doc.exists) {
    await attemptsRef.set({
      attempts: 1,
      firstAttempt: now,
      lastAttempt: now
    });
    return true;
  }
  
  const data = doc.data();
  
  if (!data) {
    await attemptsRef.set({
      attempts: 1,
      firstAttempt: now,
      lastAttempt: now
    });
    return true;
  }
  
  const timeSinceFirst = now - data.firstAttempt;
  
  if (timeSinceFirst > windowMs) {
    await attemptsRef.set({
      attempts: 1,
      firstAttempt: now,
      lastAttempt: now
    });
    return true;
  }
  
  if (data.attempts >= maxAttempts) {
    return false; 
  }
  
  await attemptsRef.update({
    attempts: admin.firestore.FieldValue.increment(1),
    lastAttempt: now
  });
  
  return true;
}