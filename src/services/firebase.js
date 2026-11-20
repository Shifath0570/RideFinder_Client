// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQkemsssfKFjMQNhxQJ_Xpcatl_s_B5Wc",
  authDomain: "ridefinder-cfc0f.firebaseapp.com",
  projectId: "ridefinder-cfc0f",
  storageBucket: "ridefinder-cfc0f.firebasestorage.app",
  messagingSenderId: "233318422570",
  appId: "1:233318422570:web:eae859358a3a949fc2cb53",
  measurementId: "G-ZXTRFMY696"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);