import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDvNZhAkgrYwEHciswePRg6Yaer-qHbVHQ",
  authDomain: "codelab-movies.firebaseapp.com",
  projectId: "codelab-movies",
  storageBucket: "codelab-movies.appspot.com",
  messagingSenderId: "400690718211",
  appId: "1:400690718211:web:a0e14d1a836ae55b445036",
});

export default app;

// apiKey: "AIzaSyA-d_L5bGbHeJBMPHN5My9I-yLzX9QFnuM",
//   authDomain: "mytodo-fbc24.firebaseapp.com",
//   projectId: "mytodo-fbc24",
//   storageBucket: "mytodo-fbc24.appspot.com",
//   messagingSenderId: "944609250461",
//   appId: "1:944609250461:web:7aa3b602b5552146b4d874"
