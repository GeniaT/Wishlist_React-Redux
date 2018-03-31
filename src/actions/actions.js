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
