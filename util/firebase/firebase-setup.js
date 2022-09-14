// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
export function initializeFirebaseApp() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyAL-nNMVRScFecxz2HymYpxtr_o8mO3KXA",
        authDomain: "yabat-e3d19.firebaseapp.com",
        projectId: "yabat-e3d19",
        storageBucket: "yabat-e3d19.appspot.com",
        messagingSenderId: "658164896532",
        appId: "1:658164896532:web:3b4d16d313681ef1032801"
    };
    // Initialize Firebase
    return initializeApp(firebaseConfig);
}
