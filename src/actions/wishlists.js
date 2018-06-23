import { firebase } from '../firebase/firebase';
import { updateEventsWishlistsLinksMatrix, updateLinksMatrixInDB } from './eventsWishlistsLinks';

export const saveWishlist = (wishlist, operation) => ({
  type: 'WISHLIST_SAVE',
  wishlist,
  operation
})

export const deleteWishlist = (wishlistId) => ({
  type: 'WISHLIST_DELETE',
  wishlistId
})

export const startWishlistCreation = (wishlist, id) => {
  const userId = firebase.auth().currentUser.uid;
  const wishlistRef1 = firebase.database().ref(`users/${userId}/wishlistsIds`);
  const wishlistRef2 = firebase.database().ref(`wishlists/${id}`);
  const itemsArray = wishlist.items.reduce((accumulator, currentValue) => {
    return [...accumulator, currentValue]
  }, []);

  return () => {
    wishlistRef1.update({[id]:wishlist.title});
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

export const startWishlistDeletion = (wishlist, id) => {
  const userId = firebase.auth().currentUser.uid;
  const wishlistRef1 = firebase.database().ref(`users/${userId}/wishlistsIds/${id}`);
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
    return wishlistRef1.remove().then(() => dispatch(updateLinksMatrixInDB()));
  }
}

export const saveWishlistInStateAndDB = (ev, operation, id, eventLinksIds, removedItemsIds) => {
  return (dispatch, getState) => {
    dispatch(saveWishlist(ev, operation));
    if (operation === 'wishlistCreation') {
      dispatch(startWishlistCreation(ev, id));
    } else if (operation === 'wishlistUpdate') {
      dispatch(startWishlistUpdate(ev, id, removedItemsIds));
    }
    return new Promise(resolve => {
      dispatch(updateEventsWishlistsLinksMatrix(operation, id, eventLinksIds));
    }).then(dispatch(updateLinksMatrixInDB()))
  }
}

export const deleteWishlistInStateAndDB = (wishlist, operation) => {
  return (dispatch, getState) => {
    return new Promise ((resolve => {
      dispatch(deleteWishlist(wishlist.id))
    }))
    .then(dispatch(updateEventsWishlistsLinksMatrix(operation, wishlist.id)))
    .then(dispatch(startWishlistDeletion(wishlist, wishlist.id)));
  }
}
