// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBHHl9jXKXbiGHX4oZqIR1Gid-p94tSyrk",
    authDomain: "flips-id-wallet.firebaseapp.com",
    projectId: "flips-id-wallet",
    storageBucket: "flips-id-wallet.firebasestorage.app",
    messagingSenderId: "787131115442",
    appId: "1:787131115442:web:25c69eaafe8cc95b9b26ab",
    measurementId: "G-4FPPMN77FX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
