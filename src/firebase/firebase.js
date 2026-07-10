import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVl6Z2Bo3ifxfUhA3h1ANeQmnzeFUEXi4",
  authDomain: "teacher-quiz-portal.firebaseapp.com",
  projectId: "teacher-quiz-portal",
  storageBucket: "teacher-quiz-portal.firebasestorage.app",
  messagingSenderId: "396974016893",
  appId: "1:396974016893:web:7f124e1201231aba5f2414",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;