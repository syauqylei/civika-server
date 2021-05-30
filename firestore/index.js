const firebase = require("firebase/app");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAnTpcZepeOLS1kLUDo2NoXIPmfu3LyBF8",
  authDomain: "civika-announcement.firebaseapp.com",
  projectId: "civika-announcement",
  storageBucket: "civika-announcement.appspot.com",
  messagingSenderId: "926883263950",
  appId: "1:926883263950:web:9b1f3e3d03982c130e679f",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

module.exports = db;
