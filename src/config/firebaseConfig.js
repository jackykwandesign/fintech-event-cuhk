//config firebase, should be env variable later

import firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyB0cTpm3NnECEvUUQofnsG0I0SGpyAjKGo",
    authDomain: "eventcuhk.firebaseapp.com",
    databaseURL: "https://eventcuhk.firebaseio.com",
    projectId: "eventcuhk",
    storageBucket: "eventcuhk.appspot.com",
    messagingSenderId: "488600771080",
    appId: "1:488600771080:web:96bc27b06c99d8d5a14fbd",
    measurementId: "G-PW7JP3FL4X"
  };
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default firebase
// Configure Firebase.