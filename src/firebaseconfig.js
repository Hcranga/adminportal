import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyDJr90Y_n6vnoq6_5VDP_RbyzlLLrs2JRU",
    authDomain: "delivo-2713e.firebaseapp.com",
    projectId: "delivo-2713e",
    storageBucket: "delivo-2713e.appspot.com",
    messagingSenderId: "57296836756",
    appId: "1:57296836756:web:8427657131b38de2dd3c81",
    measurementId: "G-17W084JP83"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;