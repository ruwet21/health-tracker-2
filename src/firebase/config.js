import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Placeholder config - User needs to replace these with their actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyBqUOb7S0hb5XLfUEY-sQ6N1k3s_CL3aag",
  authDomain: "health-tracker-8548b.firebaseapp.com",
  projectId: "health-tracker-8548b",
  storageBucket: "health-tracker-8548b.firebasestorage.app",
  messagingSenderId: "569418903197",
  appId:"1:569418903197:web:1e5def1f240a973d06ee74",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
