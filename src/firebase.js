// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBH202-1C_oF5gBLbJCQSW3-Wc_vVVTlec",
  authDomain: "fameapp-e200b.firebaseapp.com",
  projectId: "fameapp-e200b",
  storageBucket: "fameapp-e200b.firebasestorage.app",
  messagingSenderId: "1090580715979",
  appId: "1:1090580715979:web:9701a24d22eba1792c7e4e",
  measurementId: "G-PR5E209Z8N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics }; 