import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyAxiso1jY77ancsstCEcFnh2QHKamqhef0",
    authDomain: "unichat-cf076.firebaseapp.com",
    projectId: "unichat-cf076",
    storageBucket: "unichat-cf076.appspot.com",
    messagingSenderId: "388566106172",
    appId: "1:388566106172:web:aea0ade7c661aaa0694339",
  })
  .auth();
