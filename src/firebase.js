// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjwLGkov54bN1pIkIRU7wi25S89xQ5ipY",
  authDomain: "blogs-app-e2c7f.firebaseapp.com",
  projectId: "blogs-app-e2c7f",
  storageBucket: "blogs-app-e2c7f.appspot.com",
  messagingSenderId: "1041800624826",
  appId: "1:1041800624826:web:734b4819b56cb334422083",
  measurementId: "G-F4J5MVJB71"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);