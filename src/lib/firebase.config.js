// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCELM1qhcfd2MrVcZJbh3bxv_uur6eMBfQ",
    authDomain: "flixo-cart.firebaseapp.com",
    projectId: "flixo-cart",
    storageBucket: "flixo-cart.appspot.com", // fixed
    messagingSenderId: "931951714882",
    appId: "1:931951714882:web:c54eadc3052218f54783db",
};

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
