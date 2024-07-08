import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Add this line

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7QyCJcYQ7xIswzlJN7LirP2SA1E2F_jE",
  authDomain: "appmobilepi-e5b67.firebaseapp.com",
  projectId: "appmobilepi-e5b67",
  storageBucket: "appmobilepi-e5b67.appspot.com",
  messagingSenderId: "274739758731",
  appId: "1:274739758731:web:f5415dbcbdf3ce6408b68e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Add this line

export { auth, db, storage }; // Export storage as well