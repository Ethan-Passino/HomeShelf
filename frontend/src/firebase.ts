// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJNAlr7gbvZw3wuQrzIHZOt2QSEdPhC74",
  authDomain: "homeshelf-b7469.firebaseapp.com",
  projectId: "homeshelf-b7469",
  storageBucket: "homeshelf-b7469.firebasestorage.app",
  messagingSenderId: "22697074287",
  appId: "1:22697074287:web:338408ba1f1a17031c379a",
  measurementId: "G-87X0WW2NLY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);