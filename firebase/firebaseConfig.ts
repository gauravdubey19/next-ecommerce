import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "next-shop-gd.firebaseapp.com",
  databaseURL:
    "https://next-shop-gd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "next-shop-gd",
  storageBucket: "next-shop-gd.appspot.com",
  messagingSenderId: "751619029271",
  appId: "1:751619029271:web:517749a44960994b3f5f52",
  measurementId: "G-STVCPZFHME",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
