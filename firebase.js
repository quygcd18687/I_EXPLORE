import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import firebase from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyA5OsRUr1ybQbZblE5wq9GWAAalWnUxk-o",
    authDomain: "i-explore-4fe77.firebaseapp.com",
    projectId: "i-explore-4fe77",
    storageBucket: "i-explore-4fe77.appspot.com",
    messagingSenderId: "1060757207562",
    appId: "1:1060757207562:web:52f28218b6aa8b255ebdf3",
    measurementId: "G-W8QT9DYBV8"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
    console.log("\nFirebase connection successful!!!")
}
