// firebaseConfig.js (Firebase v9)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDlYDMkqLBQh0MNSESgApggeUsDUfBgQRc",
  authDomain: "biohack-50cc6.firebaseapp.com",
  projectId: "biohack-50cc6",
  storageBucket: "biohack-50cc6.appspot.com",
  messagingSenderId: "105067174591",
  appId: "1:105067174591:web:ab51de2bc42dab1240040a",
  measurementId: "G-WKPRZXLH3T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase initialized:", app);

// Initialize Firestore
const db = getFirestore(app);

export { db };
