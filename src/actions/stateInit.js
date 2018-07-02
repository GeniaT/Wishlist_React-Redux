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

export const setFriends = (friends) => ({
  type: 'SET_FRIENDS',
  friends
})

export const setEventsParticipation = (eventsParticipation) => ({
  type: 'SET_EVENTS_PARTICIPATION',
  eventsParticipation
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
        wishlistsIdsArray.push(child.key);
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
        eventsIdsArray.push(child.key);
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

export const fetchFriendsData = (userId) => {
  const friendsIdsRef = firebase.database().ref(`users/${userId}/friendsIds`);
  const friendsIdsArray = [];
  const friendsDetailsArray = [];
  return (dispatch) => {
    friendsIdsRef.once('value')
    .then(snapshot => {
      snapshot.forEach((child) => {
        friendsIdsArray.push(child.key);
      })
    })
    .then(() => friendsIdsArray.forEach((friendId, index) => {
          return firebase.database().ref(`users/${friendId}`).once('value')
          .then(snapshot => {
            friendsDetailsArray.push({id: friendId, name: snapshot.val().userInfos.displayName});
            if (index === friendsIdsArray.length-1) {
              dispatch(setFriends(friendsDetailsArray));
            }
          })
      }))
  }
}

export const fetchEventsParticipationData = (userId) => {
  const participationRef = firebase.database().ref(`users/${userId}/eventsParticipation`);
  const participationEventsDetails = [];
  return (dispatch) => {
    return participationRef.once("value").then(snapshot => {
      snapshot.forEach(function(childSnapshot) {
        const val = childSnapshot.val();
        console.log('val: ', val);
        participationEventsDetails.push(val);
      });
    })
    .then(() => dispatch(setEventsParticipation(participationEventsDetails)));
  }
}

export const startFetchingData = () => {
  const userId = firebase.auth().currentUser.uid;
  return (dispatch, getState) => {
    //We fetch all the data needed from DB
    dispatch(fetchWishlistsData(userId));
    dispatch(fetchEventsData(userId));
    dispatch(fetchLinksMatrixData(userId));
    dispatch(fetchFriendsData(userId));
    dispatch(fetchEventsParticipationData(userId));
  }
}
