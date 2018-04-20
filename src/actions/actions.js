export const logIn = () => ({
  type: 'LOG_IN'
})

export const logOut = () => ({
  type: 'LOG_OUT'
})

export const addToWishlist = (element) => ({
  type: 'ADD_TO_WISHLIST',
  element
})

export const saveWishlist = (wishlist) => ({
  type: 'SAVE_WISHLIST',
  wishlist
})
export const openModal = (id) => ({
  type:'OPEN_MODAL_FOR_WISHITEM_UPDATE',
  id
})

export const closeModal = () => ({
  type:'CLOSE_MODAL_FROM_WISHITEM_UPDATE'
})

export const saveEvent = (ev) => ({
  type: 'SAVE_EVENT',
  ev
})

export const updateEventsWishlistsLinksMatrix = (operation, id) => ({
  type: 'UPDATE_EVENTS_WISHLISTS_LINKS_MATRIX',
  operation,
  id
})
