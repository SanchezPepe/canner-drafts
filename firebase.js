import firebase from "firebase/app";
import "firebase/auth";
// import any other services you are using like "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCDEos25vQOYuGJG6p8HYvGp9Gf3BeLhDI",
  authDomain: "canner-ppsa.firebaseapp.com",
  projectId: "canner-ppsa",
  storageBucket: "canner-ppsa.firebasestorage.app",
  messagingSenderId: "564917454809",
  appId: "1:564917454809:web:00d8919bce1db95f017bc8",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export default firebase;
