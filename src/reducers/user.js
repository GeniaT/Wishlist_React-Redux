import store from '../store/store';

const initialState = {
  loggedIn: false
}

export default function user(state = initialState, action) {
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
    default:
      return {...state}
  }
}
