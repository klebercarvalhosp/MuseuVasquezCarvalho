const firebaseConfig = {
    apiKey: "AIzaSyD3hvJOm6wM33dN1qgT17Ot9PkC0dD4VVA",
    authDomain: "museuvazquezcarvalho.firebaseapp.com",
    projectId: "museuvazquezcarvalho",
    storageBucket: "museuvazquezcarvalho.appspot.com",
    messagingSenderId: "85582679224",
    appId: "1:85582679224:web:d8a7d24e5e1d5e3870b84d",
    measurementId: "G-HLN312TTP3"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();