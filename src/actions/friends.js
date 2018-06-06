import { firebase } from '../firebase/firebase';

export const addFriend = (id) => ({
  type: 'FRIEND_ADD',
  id
})

export const deleteFriend = (id) => ({
  type: 'FRIEND_DELETE',
  id
})

export const startFriendAddition = (id) => {
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
