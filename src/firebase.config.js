
import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCOF2sKDnPuIs5g9XxsmvtwFxVck-ohkfs",
  authDomain: "restart-app-6edb3.firebaseapp.com",
  projectId: "restart-app-6edb3",
  storageBucket: "restart-app-6edb3.appspot.com",
  messagingSenderId: "262703192600",
  appId: "1:262703192600:web:4a28af690776d136b5416d"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db=getFirestore();
