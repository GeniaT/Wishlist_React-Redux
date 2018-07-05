import { firebase } from '../firebase/firebase';

export const reserveItem = (item) => {
  console.log("inside reserveitem action");
  const userId = firebase.auth().currentUser.uid;
  const itemRef = firebase.database().ref(`items/${item.id}/item`);
  console.log("userid from the action: ", userId);

  return () => {
    console.log("allo?");
    return itemRef.update({reservedBy: userId});
  }
}

export const dereserveItem = (item) => {
  const userId = firebase.auth().currentUser.uid;
  const itemRef = firebase.database().ref(`items/${item.id}/item`);
  console.log("userid from the action: ", userId);

  return () => {
    console.log("allo?");
    return itemRef.update({reservedBy: ''});
  }
}
