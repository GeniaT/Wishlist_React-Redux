import store from '../store/store';

const initialState = {
  loggedIn: false
}

export default function user(state = initialState, action) {
  switch(action.type) {
    case 'LOG_IN':
      return {
        ...state,
        loggedIn: true,
        uid: action.uid
      }
    case 'LOG_OUT':
      return {
        loggedIn: false
      }
    default:
      return {...state}
  }
}
