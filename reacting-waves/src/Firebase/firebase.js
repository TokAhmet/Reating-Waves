import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBNRd_g5puZlJp1kmR6qv6u2Ohag5_K65s",
  authDomain: "reacting-waves.firebaseapp.com",
  databaseURL: "https://reacting-waves.firebaseio.com",
  projectId: "reacting-waves",
  storageBucket: "",
  messagingSenderId: "473388399075"
};

firebase.initializeApp(config);

export default firebase;