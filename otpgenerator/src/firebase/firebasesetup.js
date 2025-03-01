import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDthLn3NaO5A5VJq_9mQMk0UQcLwoj90lk",
    authDomain: "phone-otp-3708f.firebaseapp.com",
    projectId: "phone-otp-3708f",
    storageBucket: "phone-otp-3708f.firebasestorage.app",
    messagingSenderId: "611737448857",
    appId: "1:611737448857:web:6f23f2369b53a6a618e308"
};


initializeApp(firebaseConfig);
const auth = getAuth();


if (!auth) {
    throw new Error('Firebase Auth not initialized!');
}

export { auth }; 