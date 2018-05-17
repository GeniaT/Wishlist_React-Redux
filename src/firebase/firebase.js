import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCw-SL8yVCZ7QYCwRw1T02ewaKLhY6EUGg",
    authDomain: "wishlist-9f0c7.firebaseapp.com",
    databaseURL: "https://wishlist-9f0c7.firebaseio.com",
    projectId: "wishlist-9f0c7",
    storageBucket: "wishlist-9f0c7.appspot.com",
    messagingSenderId: "83148979313"
  };
firebase.initializeApp(config);
//Test for DB access:
firebase.database().ref('me').set({status: '!!!'});

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export { firebase, googleAuthProvider };
