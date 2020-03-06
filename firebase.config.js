import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// firebase init goes here
const config = {
    apiKey: "AIzaSyAAZ-jJicKLxICuu9wBIe3DRUZuNy3UYkQ",
    authDomain: "demogrid-6c526.firebaseapp.com",
    databaseURL: "https://demogrid-6c526.firebaseio.com",
    projectId: "demogrid-6c526",
    storageBucket: "demogrid-6c526.appspot.com",
    messagingSenderId: "934361068773",
    appId: "1:934361068773:web:8f6459788fc8d77b33100c",
    measurementId: "G-N4PHWNLE1H"
  };

firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

db.settings({});

// firebase collections
const analyticsCollection = db.collection('analytics');

export {
    db,
    auth,
    currentUser,
    analyticsCollection
}
