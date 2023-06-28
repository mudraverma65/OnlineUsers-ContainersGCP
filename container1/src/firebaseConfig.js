import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyA0bS4BZmN-XvXS7e7tPlh8ogD9Xzk1TTY",
    authDomain: "b00932103-csci5410.firebaseapp.com",
    projectId: "b00932103-csci5410",
    storageBucket: "b00932103-csci5410.appspot.com",
    messagingSenderId: "676985388304",
    appId: "1:676985388304:web:b37c5c8f05691e34023995",
    measurementId: "G-EWD8XZ0PSF"
  };

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

