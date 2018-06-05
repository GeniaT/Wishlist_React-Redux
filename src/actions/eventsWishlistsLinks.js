import { firebase } from '../firebase/firebase';
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
