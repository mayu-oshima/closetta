import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Firebaseの設定
const firebaseConfig = {
  apiKey: "AIzaSyAdOCUjkLVamXpHXmI8OxESkClGfI3QWJ4",
  authDomain: "closetta-auth.firebaseapp.com",
  projectId: "closetta-auth",
  storageBucket: "closetta-auth.firebasestorage.app",
  messagingSenderId: "386380948490",
  appId: "1:386380948490:web:4555d4227b57fc0e2b6bf3"
};

// Firebaseアプリを初期化
const app = initializeApp(firebaseConfig);

// 認証機能を使う設定
export const auth = getAuth(app);