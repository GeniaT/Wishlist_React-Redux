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

export const updatePotentialFriendsInState = (id, operation, name) => ({
  type: 'UPDATE_POTENTIAL_FRIENDS',
  id,
  operation,
  name
})

export const startPotentialFriends = () => {
  const userId = firebase.auth().currentUser.uid;
  const usersRef = firebase.database().ref(`users`);
  const friendsIdsRef = firebase.database().ref(`users/${userId}/friendsIds`);
  let friendsIdsArray = [];
  let suggestions = [];

  friendsIdsRef.once("value").then(snapshot => {
    snapshot.forEach(childSnapshot => {
      friendsIdsArray.push(childSnapshot.key);
    });
  })

  return (dispatch, getState) => {
    return usersRef.once("value")
    .then(snapshot => {
      // const result = snapshot.val();
      snapshot.forEach(childSnapshot => {
        const id = childSnapshot.key;
        const name = childSnapshot.child('userInfos/displayName').val();
        id !== userId && friendsIdsArray.indexOf(id) === -1 ? suggestions.push({id, name}) : null;
      })
    })
    .then(() => dispatch(setPotentialFriendsInState(suggestions)));
  }
}



export const startFriendAddition = (id) => {
  const userId = firebase.auth().currentUser.uid;
  const friendRef = firebase.database().ref(`users/${userId}/friendsIds/${id}`);
  const myFriendRef = firebase.database().ref(`users/${id}/friendsIds/${userId}`);
  return () => {
    friendRef.set({id});
    myFriendRef.set({id: userId});
  }
}

export const startFriendDeletion = (id) => {
  const userId = firebase.auth().currentUser.uid;
  const friendRef = firebase.database().ref(`users/${userId}/friendsIds/${id}`);
  const myFriendRef = firebase.database().ref(`users/${id}/friendsIds/${userId}`);
  return () => {
    friendRef.remove();
    myFriendRef.remove();
  }
}

export const addFriendInStateAndDB = (id, name) => {
  return (dispatch, getState) => {
    return new Promise ((resolve => {
      dispatch(addFriend(id, name))
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
