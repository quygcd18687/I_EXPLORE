import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import firebase from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyB10pcZBngk_gEyVJ4Pn-anCmMnKsq5zJw",
    authDomain: "rentalz-59131.firebaseapp.com",
    databaseURL: "https://rentalz-59131-default-rtdb.firebaseio.com",
    projectId: "rentalz-59131",
    storageBucket: "rentalz-59131.appspot.com",
    messagingSenderId: "784254174104",
    appId: "1:784254174104:web:b448deccd4ef3058c6e1ed",
    measurementId: "G-K6SYRSYD26"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
