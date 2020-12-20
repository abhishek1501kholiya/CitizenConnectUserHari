import firebase from 'firebase'
 var firebaseConfig = {
    apiKey: "AIzaSyDFryzejxSYbxM9yLhHphBQzo3ZZR2Z6w4",
    authDomain: "go-news-3c47d.firebaseapp.com",
    databaseURL: "https://go-news-3c47d.firebaseio.com",
    projectId: "go-news-3c47d",
    storageBucket: "go-news-3c47d.appspot.com",
    messagingSenderId: "337934705204",
    appId: "1:337934705204:web:15d127c5ce6d9add4ba061"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.database()