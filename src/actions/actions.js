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
  const userId = firebase.auth().currentUser.uid;
  const wishlistRef1 = firebase.database().ref(`users/${userId}/wishlistsIds`);
  const wishlistRef2 = firebase.database().ref(`wishlists/${id}`);
  const itemsArray = wishlist.items.reduce((accumulator, currentValue) => {
    return [...accumulator, currentValue]
  }, []);

  return () => {
    // we use update instead of push here to simplify the update in firebase later on (no generated keys)
    wishlistRef1.push(id);
    wishlistRef2.update(wishlist);
    itemsArray.forEach(item => firebase.database().ref(`items/${item.id}`).set(item))
  }
}

export const startWishlistUpdate = (wishlist, id, removedItemsIds) => {
  const userId = firebase.auth().currentUser.uid;
  const wishlistRef = firebase.database().ref(`wishlists/${id}`);

  return () => {
      wishlist.items.forEach(item => {
        firebase.database().ref(`items/${item.id}`).set({item});
      });
    if (removedItemsIds.length > 0) {
      removedItemsIds.forEach(itemId => {
        firebase.database().ref(`items/${itemId}`).remove();
      });
    }
    wishlistRef.update(wishlist);
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

export const startWishlistDeletion = (wishlist, id) => {
  const userId = firebase.auth().currentUser.uid;
  const wishlistRef1 = firebase.database().ref(`users/${userId}/wishlistsIds`);
  const wishlistRef2 = firebase.database().ref(`wishlists/${id}`);
  let itemsIds;

  return (dispatch, getState) => {
    if (wishlist.items) {
      itemsIds = wishlist.items.reduce((accumulator, currentValue) => {
        return [...accumulator, currentValue.id]
      }, []);
      itemsIds.forEach((itemId) => {
        firebase.database().ref(`items/${itemId}`).remove();
      })
    }
    wishlistRef2.remove();
    return wishlistRef1.once("value").then(snapshot => {
        snapshot.forEach(childSnapshot => {
          const key = childSnapshot.key;
          const idFromDB = snapshot.child(`${key}`).val();
          if (idFromDB === id) {
            return firebase.database().ref(`users/${userId}/wishlistsIds/${key}`).remove();
          }
      });
    }).then(() => dispatch(updateLinksMatrixInDB()));
  }
}

export const startEventCreation = (ev, id) => {
  const userId = firebase.auth().currentUser.uid;
  const eventRef1 = firebase.database().ref(`users/${userId}/eventsIds`);
  const eventRef2 = firebase.database().ref(`events/${id}`);
  const itemsArray = ev.items.reduce((accumulator, currentValue) => {
    return [...accumulator, currentValue]
  }, []);

  return () => {
    eventRef1.push(id);
    eventRef2.update(ev);
    itemsArray.forEach(item => firebase.database().ref(`items/${item.id}`).set(item))
  }
}

export const startEventUpdate = (ev, id, removedItemsIds) => {
  const userId = firebase.auth().currentUser.uid;
  const eventRef = firebase.database().ref(`events/${id}`);

  return () => {
    ev.items.forEach(item => firebase.database().ref(`items/${item.id}`).set({item}));
    eventRef.update(ev);
    if (removedItemsIds.length > 0) {
      removedItemsIds.forEach(itemId => {
        firebase.database().ref(`items/${itemId}`).remove();
      });
    }
  }
}

export const startEventDeletion = (ev, id) => {
  const userId = firebase.auth().currentUser.uid;
  const eventRef1 = firebase.database().ref(`users/${userId}/eventsIds`);
  const eventRef2 = firebase.database().ref(`events/${id}`);
  let itemsIds;

  return (dispatch, getState) => {
    if (ev.items) {
      itemsIds = ev.items.reduce((accumulator, currentValue) => {
        return [...accumulator, currentValue.id]
      }, []);
      itemsIds.forEach((itemId) => {
        firebase.database().ref(`items/${itemId}`).remove();
      })
    }
    eventRef2.remove();
    return eventRef1.once("value").then(snapshot => {
        snapshot.forEach(childSnapshot => {
          const key = childSnapshot.key;
          const idFromDB = snapshot.child(`${key}`).val();
          if (idFromDB === id) {
            console.log('removing event!');
            return firebase.database().ref(`users/${userId}/eventsIds/${key}`).remove();
          }
      });
    }).then(() => dispatch(updateLinksMatrixInDB()))
  }
}

export const saveEvent = (ev, operation) => ({
  type: 'EVENT_SAVE',
  ev,
  operation
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

export const updateLinksMatrixInDB = () => {
  return (dispatch, getState) => {
    const userId = firebase.auth().currentUser.uid;
    const linksMatrix = getState().eventsWishlistsLinks;
    const matrixRef = firebase.database().ref(`users/${userId}/eventsWishlistsLinksMatrix`);
    matrixRef.set(linksMatrix);
  }
}

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
              console.log('WLdetailsArray: ', wishlistsDetailsArray);
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
            console.log('eventsdetailsArray: ', eventsDetailsArray);
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
//Fetch from DB actions
export const startFetchingData = () => {
  const userId = firebase.auth().currentUser.uid;
  return (dispatch, getState) => {
    //We fetch all the data needed from DB
    dispatch(fetchWishlistsData(userId));
    dispatch(fetchEventsData(userId));
    dispatch(fetchLinksMatrixData(userId));
  }
}
