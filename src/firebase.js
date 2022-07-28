// For Firebase JS SDK v7.20.0 and later, measurementId is optional


//import firebase from 'firebase';
// Got these import from a github code not sure why this works and not the previous one
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAi9sQiWr5txdAcYnsTAcrP_GLeAzhaXII",
    authDomain: "clone-f5f63.firebaseapp.com",
    projectId: "clone-f5f63",
    storageBucket: "clone-f5f63.appspot.com",
    messagingSenderId: "485872666842",
    appId: "1:485872666842:web:cd3fbee61c9bdb497bfde3",
    measurementId: "G-PHNWLY6LQF"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  const auth = firebase.auth();

  export { db, auth };