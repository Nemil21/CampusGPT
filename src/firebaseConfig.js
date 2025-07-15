import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics"

// Your Firebase config - Replace with your actual Firebase project config
const firebaseConfig = {
    apiKey: "AIzaSyCUbpLNzzMshe3oWHS0l8zLbttTgq8E-XM",
    authDomain: "campusgpt-cc584.firebaseapp.com",
    projectId: "campusgpt-cc584",
    storageBucket: "campusgpt-cc584.firebasestorage.app",
    messagingSenderId: "594529384378",
    appId: "1:594529384378:web:118852eb2b6caf69544f83",
    measurementId: "G-C16KBK690P"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app; 