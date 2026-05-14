// Core Firebase
import { initializeApp } from "firebase/app";

// Services to actually use
import { getFirestore } from "firebase/firestore";
import { getStorage }   from "firebase/storage";
import { getAuth }      from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
  apiKey:            "AIzaSyAriNqZwFEojhjQ49t7lwpzq0kJruEFZvs",
  authDomain:        "world-cup-fan-zone.firebaseapp.com",
  projectId:         "world-cup-fan-zone",
  storageBucket:     "world-cup-fan-zone.firebasestorage.app",
  messagingSenderId: "566997374659",
  appId:             "1:566997374659:web:0cfdbaeb3d75706b18b476",
  measurementId:     "G-7G8CR03W8M"
};

// Initialize the app
const app = initializeApp(firebaseConfig);

// Initialize and export each service
export const db      = getFirestore(app);
export const storage = getStorage(app);
export const auth    = getAuth(app);