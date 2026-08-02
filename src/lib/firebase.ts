import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCzJq_KXsXyvDhRg3xaEMemXcCzCCpfZ3g",
  authDomain: "pisind-pet-store.firebaseapp.com",
  databaseURL: "https://pisind-pet-store-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pisind-pet-store",
  storageBucket: "pisind-pet-store.firebasestorage.app",
  messagingSenderId: "555464132994",
  appId: "1:555464132994:web:0652f5f71ed285711a279b",
  measurementId: "G-4MT860EE16",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
