import firebase from "firebase/app";
import "firebase/auth";
// import any other services you are using like "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCyb22pOFhVPNOR6z1nvk7m6eo43I7VxVM",
  authDomain: "canner-jjsa.firebaseapp.com",
  projectId: "canner-jjsa",
  storageBucket: "canner-jjsa.appspot.com",
  messagingSenderId: "222426529343",
  appId: "1:222426529343:web:4c41f1edfcff235dccc28a",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export default firebase;
