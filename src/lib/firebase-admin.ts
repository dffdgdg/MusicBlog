import admin from 'firebase-admin';
export { admin };

function getServiceAccount() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    console.error('Missing Firebase environment variables:');
    console.error('FIREBASE_PROJECT_ID:', !!projectId);
    console.error('FIREBASE_CLIENT_EMAIL:', !!clientEmail);
    console.error('FIREBASE_PRIVATE_KEY:', !!privateKey);
    throw new Error('Missing Firebase environment variables');
  }

  return {
    projectId,
    clientEmail,
    privateKey,
  };
}

if (!admin.apps.length) {
  try {
    const serviceAccount = getServiceAccount();
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://${serviceAccount.projectId}.firebaseio.com`
    });
    
    console.log('✅ Firebase Admin initialized successfully');
  } 
  catch (error) 
  {
    console.error('❌ Firebase Admin initialization failed:', error);
  }
}

export const adminDb = admin.firestore();