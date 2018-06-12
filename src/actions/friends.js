import { firebase } from '../firebase/firebase';

export const addFriend = (id, name) => ({
  type: 'FRIEND_ADD',
  id,
  name
})

export const deleteFriend = (id) => ({
  type: 'FRIEND_DELETE',
  id
})

export const setPotentialFriendsInState = (suggestions) => ({
  type: 'SET_POTENTIAL_FRIENDS',
  suggestions
})

export const startPotentialFriends = () => {
  const userId = firebase.auth().currentUser.uid;
  const ref = firebase.database().ref(`users`);
  let suggestions = [];
  return (dispatch, getState) => {
    return ref.once("value")
    .then(snapshot => {
      // const result = snapshot.val();
      snapshot.forEach(childSnapshot => {
        const id = childSnapshot.key;
        const name = childSnapshot.child('userInfos/displayName').val();
        id !== userId ? suggestions.push({id, name}) : null;
      })
    })
    .then(() => dispatch(setPotentialFriendsInState(suggestions)));
  }
}

export const startFriendAddition = (id) => {
  console.log('in start friend id addition to db');
  const userId = firebase.auth().currentUser.uid;
  const friendRef = firebase.database().ref(`users/${userId}/friendsIds`);
  return () => friendRef.push(id);
}

export const startFriendDeletion = (id) => {
  const userId = firebase.auth().currentUser.uid;
  const friendRef = firebase.database().ref(`users/${userId}/friendsIds`);
  return friendRef.once("value").then(snapshot => {
      snapshot.forEach(childSnapshot => {
        const key = childSnapshot.key;
        const idFromDB = snapshot.child(`${key}`).val();
        if (idFromDB === id) {
          console.log('removing friend!');
          return firebase.database().ref(`users/${userId}/friendsIds/${key}`).remove();
        }
    });
  })
}

export const addFriendInStateAndDB = (id) => {
  return (dispatch, getState) => {
    return new Promise ((resolve => {
      dispatch(addFriend(id))
    })).then(dispatch(startFriendAddition(id)));
  }
}

export const deleteFriendInStateAndDB = (id) => {
  return (dispatch, getState) => {
    return new Promise ((resolve => {
      dispatch(deleteFriend(id))
    })).then(dispatch(startFriendDeletion(id)));
  }
}
