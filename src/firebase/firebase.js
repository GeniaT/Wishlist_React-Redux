import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCw-SL8yVCZ7QYCwRw1T02ewaKLhY6EUGg",
    authDomain: "wishlist-9f0c7.firebaseapp.com",
    databaseURL: "https://wishlist-9f0c7.firebaseio.com",
    projectId: "wishlist-9f0c7",
    storageBucket: "wishlist-9f0c7.appspot.com",
    messagingSenderId: "83148979313"
  };

firebase.auth.Auth.Persistence.LOCAL; //https://firebase.google.com/docs/auth/web/auth-state-persistence
firebase.initializeApp(config);


const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthprovider = new firebase.auth.FacebookAuthProvider();

export { firebase, googleAuthProvider, facebookAuthprovider };
