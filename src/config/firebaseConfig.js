//config firebase, should be env variable later

import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/analytics'
var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default firebase
// Configure Firebase.
