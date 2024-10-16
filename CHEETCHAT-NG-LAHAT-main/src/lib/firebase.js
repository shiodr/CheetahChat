import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = process.env.NODE_ENV === 'production' ? {
  apiKey: "AIzaSyC-i-_e-DdbtpmrFMbIrIFMAKJQGX7jPOI",
  authDomain: "cheetahchat-e7ae8.firebaseapp.com",
  projectId: "cheetahchat-e7ae8",
  storageBucket: "cheetahchat-e7ae8.appspot.com",
  messagingSenderId: "1065154218546",
  appId: "1:1065154218546:web:fca3171f55e0a2d7818a2b"
} : {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-8953e.firebaseapp.com",
  projectId: "reactchat-8953e",
  storageBucket: "reactchat-8953e.appspot.com",
  messagingSenderId: "989490756392",
  appId: "1:989490756392:web:9e54e92c7b39c531b82e1d"
};

// Now you can use firebaseConfig in your application.

const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()