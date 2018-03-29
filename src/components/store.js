import { createStore } from 'redux';

const initialState = {
  wishlist: ['gta V', 'FFX', 'CLRS'],
  loggedIn: false
}
const logIn = () => ({
  type: 'LOG_IN'
})

export const addToWishlist = (element) => ({
  type: 'ADD_TO_WISHLIST',
  element
})

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOG_IN':
      loggedIn: true
    case 'ADD_TO_WISHLIST':
      wishlist: state.wishlist.push(action.element);
    default:
      return state;
  }
}


const store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});

// dispatch some actions

// store.dispatch(addToWishlist("PizzaInn Lunch"));
// store.dispatch(logIn());

export default store;
