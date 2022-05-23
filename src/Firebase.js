import firebase from "firebase/app";
import "firebase/auth";



//firebase config
export const auth = firebase
  .initializeApp({
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
  })
  .auth();
