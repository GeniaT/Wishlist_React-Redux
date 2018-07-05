import moment from 'moment';

const initialState = [];

export default function wishlists(state = initialState, action) {
  switch(action.type) {
    case 'SET_WISHLISTS':
      return action.wishlists;
      break;
    case 'WISHLIST_DELETE':
      return [...state.filter((wishlist) => wishlist.id !== action.wishlistId)]
      break;
    case 'WISHLIST_SAVE':
      if (action.operation === 'wishlistUpdate') {
        state.forEach((list, index) => {
          if (list.id === action.wishlist.id) {
            return state[index] = action.wishlist;
          }
        });
      } else if (action.operation === 'wishlistCreation' && action.wishlist.title) {
        return [...state.concat(action.wishlist)];
      }
    default:
      return state
  }
}
