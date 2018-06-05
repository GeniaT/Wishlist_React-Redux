import { firebase } from '../firebase/firebase';
import { updateEventsWishlistsLinksMatrix, updateLinksMatrixInDB } from './eventsWishlistsLinks';

export const saveEvent = (ev, operation) => ({
  type: 'EVENT_SAVE',
  ev,
  operation
})

export const deleteEvent = (eventId) => ({
  type: 'EVENT_DELETE',
  eventId
})

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

export const saveEventInStateAndDB = (ev, operation, id, wishlistLinksIds, removedItemsIds) => {
  return (dispatch, getState) => {
    dispatch(saveEvent(ev, operation));
    if (operation === 'eventCreation') {
      dispatch(startEventCreation(ev, id));
    } else if (operation === 'eventUpdate') {
      dispatch(startEventUpdate(ev, id, removedItemsIds));
    }
    return new Promise(resolve => {
      dispatch(updateEventsWishlistsLinksMatrix(operation, id, wishlistLinksIds));
    }).then(dispatch(updateLinksMatrixInDB()))
  }
}

export const deleteEventInStateAndDB = (ev, operation) => {
  return (dispatch, getState) => {
    return new Promise ((resolve => {
      dispatch(deleteEvent(ev.id))
    }))
    .then(dispatch(updateEventsWishlistsLinksMatrix(operation, ev.id)))
    .then(dispatch(startEventDeletion(ev, ev.id)));
  }
}
