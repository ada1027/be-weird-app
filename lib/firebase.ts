// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFExprhPPpGmKJQF0_hatENqkkWeWvos4",
  authDomain: "be-weird.firebaseapp.com",
  projectId: "be-weird",
  storageBucket: "be-weird.firebasestorage.app",
  messagingSenderId: "1045245842634",
  appId: "1:1045245842634:web:863330545fdd13b93c9033",
  measurementId: "G-DXVFCQT6BF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);