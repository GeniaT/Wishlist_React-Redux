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
  const itemsArray = wishlistObj.items.reduce((accumulator, currentValue) => {
    return [...accumulator, currentValue]
  }, []);

  return () => {
    const userId = firebase.auth().currentUser.uid;
    const wishlistRef1 = firebase.database().ref(`users/${userId}/wishlistsIds`);
    const wishlistRef2 = firebase.database().ref(`wishlists/${wishlistId}`);
    // we use update instead of push here to simplify the update in firebase later on
    // by avoiding to iterate through all keys generated from push(). Furthermore if wishlistId key
    // doesn't exist in firebase, it will be created via update()
    wishlistRef2.update(wishlistObj);
    itemsArray.forEach((item) => {
      firebase.database().ref(`items/${item.id}`).set(item);
    })
    return wishlistRef1.push(wishlistId);
  }
}

export const startWishlistUpdate = (wishlist, id, removedItemsIds) => {
  const wishlistObj = wishlist;
  const wishlistId = id;
  const deletedItemsIds = removedItemsIds;
  return () => {
    const userId = firebase.auth().currentUser.uid;
    const wishlistRef = firebase.database().ref(`wishlists/${wishlistId}`);
      wishlistObj.items.forEach(item => {
        firebase.database().ref(`items/${item.id}`).set({item});
      });
    if (deletedItemsIds.length > 0) {
      deletedItemsIds.forEach(itemId => {
        firebase.database().ref(`items/${itemId}`).remove();
      });
    }
    return wishlistRef.update(wishlistObj);
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
  const wishlistObj = wishlist;
  const wishlistId = id;
  const itemsIds = wishlistObj.items.reduce((accumulator, currentValue) => {
    return [...accumulator, currentValue.id]
  }, []);
  return () => {
    const userId = firebase.auth().currentUser.uid;
    const wishlistRef1 = firebase.database().ref(`users/${userId}/wishlistsIds`);
    const wishlistRef2 = firebase.database().ref(`wishlists/${wishlistId}`);
    wishlistRef2.remove();
    itemsIds.forEach((itemId) => {
      firebase.database().ref(`items/${itemId}`).remove();
    })
    return wishlistRef1.once("value").then(snapshot => {
        snapshot.forEach(childSnapshot => {
          const key = childSnapshot.key;
          const idFromDB = snapshot.child(`${key}`).val();
          if (idFromDB === wishlistId) {
            return firebase.database().ref(`users/${userId}/wishlistsIds/${key}`).remove();
          }
      });
    });
  }
}

export const startEventCreation = (ev, id) => {
  const eventObj = ev;
  const eventId = id;
  const itemsArray = eventObj.items.reduce((accumulator, currentValue) => {
    return [...accumulator, currentValue]
  }, []);
  return () => {
    const userId = firebase.auth().currentUser.uid;
    const eventRef1 = firebase.database().ref(`users/${userId}/eventsIds`);
    const eventRef2 = firebase.database().ref(`events/${eventId}`);
    eventRef2.update(eventObj);
    itemsArray.forEach((item) => {
      firebase.database().ref(`items/${item.id}`).set(item);
    })
    return eventRef1.push(eventId);
  }
}

export const startEventUpdate = (ev, id, removedItemsIds) => {
  const eventObj = ev;
  const eventId = id;
  const deletedItemsIds = removedItemsIds;
  return () => {
    const userId = firebase.auth().currentUser.uid;
    const eventRef = firebase.database().ref(`events/${eventId}`);
    eventObj.items.forEach(item => {
      firebase.database().ref(`items/${item.id}`).set({item});
    });
  if (deletedItemsIds.length > 0) {
    deletedItemsIds.forEach(itemId => {
      firebase.database().ref(`items/${itemId}`).remove();
    });
  }
    return eventRef.update(eventObj);
  }
}

export const startEventDeletion = (ev, id) => {
  const eventObj = ev;
  const eventId = id;
  const itemsIds = eventObj.items.reduce((accumulator, currentValue) => {
    return [...accumulator, currentValue.id]
  }, []);
  return () => {
    const userId = firebase.auth().currentUser.uid;
    const eventRef1 = firebase.database().ref(`users/${userId}/eventsIds`);
    const eventRef2 = firebase.database().ref(`events/${eventId}`);

    eventRef2.remove();
    itemsIds.forEach((itemId) => {
      firebase.database().ref(`items/${itemId}`).remove();
    })
    return eventRef1.once("value").then(snapshot => {
        snapshot.forEach(childSnapshot => {
          const key = childSnapshot.key;
          const idFromDB = snapshot.child(`${key}`).val();
          if (idFromDB === eventId) {
            console.log('removing event!');
            return firebase.database().ref(`users/${userId}/eventsIds/${key}`).remove();
          }
      });
    });
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
