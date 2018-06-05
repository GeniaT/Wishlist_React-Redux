import { firebase } from '../firebase/firebase';

// state init actions
export const setWishlists = (wishlists) => ({
  type: 'SET_WISHLISTS',
  wishlists
})

export const setEvents = (events) => ({
  type: 'SET_EVENTS',
  events
})

export const setLinksMatrix = (linksMatrix) => ({
  type: 'SET_LINKS_MATRIX',
  linksMatrix
})

//Fetch from DB actions
export const fetchWishlistsData = (userId) => {
  const wishlistsIdsRef = firebase.database().ref(`users/${userId}/wishlistsIds`);
  const wishlistsIdsArray = [];
  const wishlistsDetailsArray = [];
  return (dispatch) => {
    wishlistsIdsRef.once('value')
    .then(snapshot => {
      snapshot.forEach((child) => {
        wishlistsIdsArray.push(child.val());
      })
    })
    .then(() => wishlistsIdsArray.forEach((wishlistId, index) => {
          firebase.database().ref(`wishlists/${wishlistId}`).once('value')
          .then(snapshot => {
            wishlistsDetailsArray.push(snapshot.val());
              // console.log('WLdetailsArray: ', wishlistsDetailsArray);
              if (index === wishlistsIdsArray.length-1) {
                dispatch(setWishlists(wishlistsDetailsArray));
              }
          })
        }))
  }
}

export const fetchEventsData = (userId) => {
  const eventsIdsRef = firebase.database().ref(`users/${userId}/eventsIds`);
  const eventsIdsArray = [];
  const eventsDetailsArray = [];
  return (dispatch) => {
    eventsIdsRef.once('value')
    .then(snapshot => {
      snapshot.forEach((child) => {
        eventsIdsArray.push(child.val());
      })
    })
    .then(() => eventsIdsArray.forEach((eventId, index) => {
          return firebase.database().ref(`events/${eventId}`).once('value')
          .then(snapshot => {
            eventsDetailsArray.push(snapshot.val());
            // console.log('eventsdetailsArray: ', eventsDetailsArray);
            if (index === eventsIdsArray.length-1) {
              dispatch(setEvents(eventsDetailsArray));
            }
          })
      }))
  }
}

export const fetchLinksMatrixData = (userId) => {
  const matrixRef = firebase.database().ref(`users/${userId}/eventsWishlistsLinksMatrix`);
  return (dispatch) => {
    matrixRef.once("value").then(snapshot => {
      if (snapshot.val() !== null) dispatch(setLinksMatrix(snapshot.val()))
    });
  }
}

export const startFetchingData = () => {
  const userId = firebase.auth().currentUser.uid;
  return (dispatch, getState) => {
    //We fetch all the data needed from DB
    dispatch(fetchWishlistsData(userId));
    dispatch(fetchEventsData(userId));
    dispatch(fetchLinksMatrixData(userId));
  }
}
