// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD3hvJOm6wM33dN1qgT17Ot9PkC0dD4VVA",
    authDomain: "museuvazquezcarvalho.firebaseapp.com",
    projectId: "museuvazquezcarvalho",
    storageBucket: "museuvazquezcarvalho.appspot.com",
    messagingSenderId: "85582679224",
    appId: "1:85582679224:web:d8a7d24e5e1d5e3870b84d",
    measurementId: "G-HLN312TTP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);