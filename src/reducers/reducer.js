import { addToWishlist, logIn } from '../actions/actions';

const initialState = {
  wishlist: ['gta V', 'FFX', 'CLRS'],
  loggedIn: true,
  // wishlists: [{
  //
  // }
  //
  // ]
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOG_IN':
      return {
        ...state,
        loggedIn: true
      }
    case 'LOG_OUT':
      return {
        ...state,
        loggedIn: false
      }
    case 'ADD_TO_WISHLIST':
      return {
        ...state,
        wishlist: [...state.wishlist, action.element]
      }
    default:
      return state;
  }
}

export default reducer;
