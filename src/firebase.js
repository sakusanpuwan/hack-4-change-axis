// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "axis-e7a56.firebaseapp.com",
  projectId: "axis-e7a56",
  storageBucket: "axis-e7a56.appspot.com",
  messagingSenderId: "552906429090",
  appId: "1:552906429090:web:440014ef63adc557607dfb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
