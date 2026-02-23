
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAlTFWgVxCbbXvByqHGJCHPhVWGoL4cirA",
  authDomain: "karaokebes-a4b12.firebaseapp.com",
  projectId: "karaokebes-a4b12",
  storageBucket: "karaokebes-a4b12.firebasestorage.app",
  messagingSenderId: "939577720572",
  appId: "1:939577720572:web:24bd3bb605a2c8ed966179"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
