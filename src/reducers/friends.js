const initialState = [];

export default function friends(state = initialState, action) {
  switch (action.type) {
    case 'SET_FRIENDS':
      return action.friends;
      break;
    case 'FRIEND_DELETE':
      return [...state.filter((id) => id !== action.id)]
      break;
    case 'FRIEND_ADD':
      return [...state.concat(action.id)]      
      break;
    default:
      return state
  }
}
