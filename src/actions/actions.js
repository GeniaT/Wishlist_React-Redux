import { firebase, googleAuthProvider } from '../firebase/firebase';
import moment from 'moment';
import store from '../store/store';

export const logIn = (uid) => ({
  type: 'LOG_IN',
  uid
})

export const startLogin = () => {
  return () => { //we return a fct instead of an obj so we can trigger async actions with firebase thanks to thunk middleware.
    return firebase.auth().signInWithPopup(googleAuthProvider);
  }
}

export const logOut = () => ({
  type: 'LOG_OUT'
})

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
            email: userInfo.email,
            creationDate: moment().format('MMMM Do YYYY')
          }
        }
      );
    }
  });
}

export const startWishlistCreation = (wishlist, id) => {
  const wishlistObj = wishlist;
  const wishlistId = id;
  return () => {
    const userId = firebase.auth().currentUser.uid;
    const wishlistRef1 = firebase.database().ref(`users/${userId}/wishlistsIds`);
    const wishlistRef2 = firebase.database().ref('wishlists');
    wishlistRef2.push(wishlistObj);
    return wishlistRef1.push(wishlistId).then(() => {
    });
  }
}

export const startWishlistUpdate = (wishlist, id) => {
  const wishlistObj = wishlist;
  const wishlistId = id;
  return () => {
    const userId = firebase.auth().currentUser.uid;
    const wishlistRef = firebase.database().ref('wishlists');
    wishlistRef.once('value').then(snapshot => {
      snapshot.forEach(child => {
        const key = child.key;
        const idFromDB = snapshot.child(key).val().id;
        if (idFromDB === wishlistId) {
          const wishlistToUpdateRef = firebase.database().ref(`wishlists/${key}`);
          wishlistToUpdateRef.update(wishlistObj);
          console.log('wishlist update: DONE');
          return true;
        }
      });
      console.log('nothing found, no update.');
    });
  }
}

export const saveWishlist = (wishlist, operation) => ({
  type: 'WISHLIST_SAVE',
  wishlist,
  operation
})

export const deleteWishlist = (wishlistId) => ({
  type: 'WISHLIST_DELETE',
  wishlistId
})

export const saveEvent = (ev) => ({
  type: 'EVENT_SAVE',
  ev
})

export const deleteEvent = (eventId) => ({
  type: 'EVENT_DELETE',
  eventId
})

export const updateEventsWishlistsLinksMatrix = (operation, id, linksIds) => ({
  type: 'MATRIX_EVENTS_WISHLISTS_LINKS_UPDATE',
  operation,
  id,
  linksIds
})
