import { firebase, googleAuthProvider, facebookAuthprovider } from '../firebase/firebase';
import moment from 'moment';

export const logIn = (uid) => ({
  type: 'LOG_IN',
  uid
})

export const logOut = () => ({
  type: 'LOG_OUT'
})

export const startLoginWithGoogle = () => {
  return () => { //we return a fct instead of an obj so we can trigger async actions with firebase thanks to thunk middleware.
    return firebase.auth().signInWithPopup(googleAuthProvider);
  }
}

export const startLoginWithFacebook = () => {
  return () => {
    return firebase.auth().signInWithPopup(facebookAuthprovider)
  }
}

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  }
};

export const createUser = (uid) => {
  const userInfo = firebase.auth().currentUser;
  const userId = userInfo.uid;
  const userNamesArray = userInfo.displayName.split(' ');
  const userRef = firebase.database().ref(`users/${userId}`);

  return userRef.once("value").then(function(snapshot) {
      if (!snapshot.exists()) { //create if the authed user doesn't exist in firebase
        userRef.set({
          userInfos: {
            'First name': userNamesArray[0],
            'Last name': userNamesArray.slice(1).join(' '),
            displayName: userInfo.displayName,
            email: userInfo.email,
            creationDate: moment().format('MMMM Do YYYY'),
            photo: userInfo.photoURL
          }
        }
      );
    }
  });
}
