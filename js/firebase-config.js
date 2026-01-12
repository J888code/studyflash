// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAfJ26aBhiVWEYRDGAHO25rNDxlEib8nWE",
    authDomain: "studyflash-7f902.firebaseapp.com",
    projectId: "studyflash-7f902",
    storageBucket: "studyflash-7f902.firebasestorage.app",
    messagingSenderId: "631685988096",
    appId: "1:631685988096:web:cf1c9b4d8ca7a7aa0bfde5",
    measurementId: "G-1P7M2ECQ4N"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const auth = firebase.auth();
const db = firebase.firestore();

// Auth state observer
let currentUser = null;

auth.onAuthStateChanged((user) => {
    currentUser = user;
    if (user) {
        console.log('User signed in:', user.email);
        Auth.onUserSignedIn(user);
    } else {
        console.log('User signed out');
        Auth.onUserSignedOut();
    }
});
