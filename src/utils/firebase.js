// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8zgZeeqkMGmZS-lHQMyHFYg8j2r8pSM0",
  authDomain: "netflix-gpt-422d7.firebaseapp.com",
  projectId: "netflix-gpt-422d7",
  storageBucket: "netflix-gpt-422d7.firebasestorage.app",
  messagingSenderId: "965258794115",
  appId: "1:965258794115:web:ec490648acda4271d9b7b6",
  measurementId: "G-VJM7TJRM7C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();