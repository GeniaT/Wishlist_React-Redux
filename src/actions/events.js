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
  const eventRef1 = firebase.database().ref(`users/${userId}/eventsIds/${id}`);
  const eventRef2 = firebase.database().ref(`events/${id}`);
  const itemsArray = ev.items.reduce((accumulator, currentValue) => {
    return [...accumulator, currentValue]
  }, []);
  const participants = ev.participants;

  return () => {
    eventRef1.update({[id]:ev.title});
    eventRef2.update(ev);
    itemsArray.forEach(item => firebase.database().ref(`items/${item.id}`).set(item));
    if (participants) {
      participants.forEach(friend => firebase.database().ref(`users/${friend.id}/eventsParticipation/${id}`).set({[id]:ev.title}));
    }
  }
}

export const startEventUpdate = (ev, id, removedItemsIds, removedParticipantsIds, reservedItems, unreservedItems) => {
  const userId = firebase.auth().currentUser.uid;
  const eventRef = firebase.database().ref(`events/${id}`);
  const participants = ev.participants;

  return () => {
    ev.items.forEach(item => firebase.database().ref(`items/${item.id}`).set({item}));
    eventRef.update(ev);
    if (participants) {
      participants.forEach(friend => firebase.database().ref(`users/${friend.id}/eventsParticipation/${id}`).set({[id]:ev.title}));
    }
    if (removedItemsIds && removedItemsIds.length > 0) {
      removedItemsIds.forEach(itemId => {
        firebase.database().ref(`items/${itemId}`).remove();
      });
    }
    if (removedParticipantsIds && removedParticipantsIds.length > 0) {
      removedParticipantsIds.forEach(participantId => {
        firebase.database().ref(`users/${participantId}/eventsParticipation/${id}`).remove();
      })
    }
    if (reservedItems && reservedItems.length > 0) {
      firebase.database().ref(`events/${id}/items`).once("value")
      .then(function(snapshot) {
        let counter = 0;
        console.log('snap val: ', snapshot.val());
        snapshot.forEach(function(childSnapshot) {
          var key = childSnapshot.key;
          var childData = childSnapshot.val();
          // console.log('childkey: ', key);
          // console.log("childData: ", childData);
          // console.log('childData.id: ', childData.id);
          // console.log('counter: ', counter);
          if (reservedItems.indexOf(childData.id) !== -1) {
            const reservedItemref = firebase.database().ref(`events/${id}/items/${counter}`);
            // console.log("found in DB the item to be reserved!");
            reservedItemref.update({ reservedBy: userId });
          }
          counter += 1;
          console.log('counter: ', counter);
      });
    });
      console.log('reserved Items: ', reservedItems);
    }
    if (unreservedItems && unreservedItems.length > 0) {
      firebase.database().ref(`events/${id}/items`).once("value")
        .then(function(snapshot) {
          let counter = 0;
          console.log('snap val: ', snapshot.val());
          snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            // console.log('childkey: ', key);
            // console.log("childData: ", childData);
            // console.log('childData.id: ', childData.id);
            // console.log('counter: ', counter);
            if (unreservedItems.indexOf(childData.id) !== -1) {
              const unreservedItemref = firebase.database().ref(`events/${id}/items/${counter}`);
              // console.log("found in DB the item to be reserved!");
              unreservedItemref.update({ reservedBy: '' });
            }
            counter += 1;
        });
      });
    }
  }
}

export const startEventDeletion = (ev, id) => {
  const userId = firebase.auth().currentUser.uid;
  const eventRef1 = firebase.database().ref(`users/${userId}/eventsIds/${id}`);
  const eventRef2 = firebase.database().ref(`events/${id}`);
  const participants = ev.participants;

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
    if (participants) {
      participants.forEach(friend => firebase.database().ref(`users/${friend.id}/eventsParticipation/${id}`).remove());
    }
    eventRef2.remove();
    return eventRef1.remove().then(() => dispatch(updateLinksMatrixInDB()))
  }
}

export const saveEventInStateAndDB = (ev, operation, id, wishlistLinksIds, removedItemsIds, removedParticipantsIds) => {
  return (dispatch, getState) => {
    if (operation === 'eventCreation') {
      dispatch(startEventCreation(ev, id));
    } else if (operation === 'eventUpdate') {
      dispatch(startEventUpdate(ev, id, removedItemsIds, removedParticipantsIds));
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
