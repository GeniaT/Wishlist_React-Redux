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
  //Add Logic to check if the user exists in the DB or not + init the user id in the app with firebase's generated id.
  console.log("in createUser action");
  const userRef = firebase.database().ref('users');
  const userInfo = firebase.auth().currentUser;
  const userNamesArray = userInfo.displayName.split(' ');
  userRef.push({userInfos: {
    'First name': userNamesArray[0],
    'Last name': userNamesArray.slice(1).join(' '),
    email: userInfo.email,
    creationDate: moment().format('MMMM Do YYYY')
    }
  });
}

export const saveWishlist = (wishlist) => ({
  type: 'WISHLIST_SAVE',
  wishlist
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
