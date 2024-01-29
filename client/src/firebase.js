// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API,
  authDomain: "auth-webapp-22991.firebaseapp.com",
  projectId: "auth-webapp-22991",
  storageBucket: "auth-webapp-22991.appspot.com",
  messagingSenderId: "479933648583",
  appId: "1:479933648583:web:233dd84d1d132287f578e2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);