import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";

// Your specific keys
const firebaseConfig = {
  apiKey: "AIzaSyBgQV6YHETnfE2btpe5Fk0AY-sB0EgH7rU",
  authDomain: "my-react-journey-d0841.firebaseapp.com",
  projectId: "my-react-journey-d0841",
  storageBucket: "my-react-journey-d0841.firebasestorage.app",
  messagingSenderId: "373005014733",
  appId: "1:373005014733:web:02c2abbd9ec6718b61bb84",
  measurementId: "G-EZN39WSNWZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🛡️ THE FIX: Force "Long Polling" to bypass network blocks
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export { db };