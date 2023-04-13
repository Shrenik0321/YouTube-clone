// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZB1NhOYsuOOg_OQ1Bh56Ns_9Ls3yyp40",
  authDomain: "clone-e4494.firebaseapp.com",
  projectId: "clone-e4494",
  storageBucket: "clone-e4494.appspot.com",
  messagingSenderId: "196635647638",
  appId: "1:196635647638:web:bf8cb00cbf637ac17dacb7",
  measurementId: "G-MWL8B781WS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
