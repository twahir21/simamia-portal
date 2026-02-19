// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwhbmYxGUShX4_NOpkTZNQYA0aYTbO2pE",
  authDomain: "simamia-payment.firebaseapp.com",
  projectId: "simamia-payment",
  storageBucket: "simamia-payment.firebasestorage.app",
  messagingSenderId: "160846293211",
  appId: "1:160846293211:web:462aec95743c1e2a8504fe"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export { app };