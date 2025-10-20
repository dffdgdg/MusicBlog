// Файл src/lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyBQSHKhA_RXVHQHkb_EfQJuq5URMOyssT4",

  authDomain: "sample-firebase-ai-app-a3472.firebaseapp.com",

  databaseURL: "https://sample-firebase-ai-app-a3472-default-rtdb.firebaseio.com",

  projectId: "sample-firebase-ai-app-a3472",

  storageBucket: "sample-firebase-ai-app-a3472.firebasestorage.app",

  messagingSenderId: "760003202320",

  appId: "1:760003202320:web:020750035a5441bf5fa995"

};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);