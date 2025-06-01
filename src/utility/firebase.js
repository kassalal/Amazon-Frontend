// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCA12ZuJ-9UzdrxmuUt_IAolbBcIsnNm88",
  authDomain: "clone-83650.firebaseapp.com",
  projectId: "clone-83650",
  storageBucket: "clone-83650.firebasestorage.app",
  messagingSenderId: "24155275518",
  appId: "1:24155275518:web:47cfa64dec08222e83e5af",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const db = getFirestore(app);
export { db };
