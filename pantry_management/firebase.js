// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfSDwrwWndxqKbhoGSi6ayyx3r2qQezwc",
  authDomain: "pantry-management-eaa01.firebaseapp.com",
  projectId: "pantry-management-eaa01",
  storageBucket: "pantry-management-eaa01.appspot.com",
  messagingSenderId: "875910781166",
  appId: "1:875910781166:web:f5aea70025ba3efe287bff",
  measurementId: "G-7DP48CWM4J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export {firestore}