import firebase from "firebase/compat/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import initializeApp = firebase.initializeApp;

const firebaseConfig = {
    apiKey: "AIzaSyA1ZKKkrLtuZ7PsWh0GaMaSeNHJNFYNUCY",
    authDomain: "dagaelectronicsprojectdev.firebaseapp.com",
    projectId: "dagaelectronicsprojectdev",
    storageBucket: "dagaelectronicsprojectdev.firebasestorage.app",
    messagingSenderId: "322148270925",
    appId: "1:322148270925:web:0e97c1ccb8dd187bdc6d04",
    measurementId: "G-1DTKML7DH8"
};

const app = initializeApp(firebaseConfig);

export const useFirebase = () => {
    const auth = getAuth(app);

    return {
        // DATA
        auth,
        // METHODS
        signOut,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
    }
}