const initialState = [];

// this will be a global temporary state that may be fed by friends suggestions, wishlists suggestions,... from various searches
export default function suggestions(state = initialState, action) {
  switch (action.type) {
    case 'SET_POTENTIAL_FRIENDS':
      return action.suggestions;
      break;
    case 'UPDATE_POTENTIAL_FRIENDS':
    console.log('updating suggestions!');
    if (action.operation === 'add') {
      return [...state.filter(potentialFriend => potentialFriend.id !== action.id)];
    } else if (action.operation === 'delete') {
      return [...state.concat({id: action.id, name: action.name})]
    }
    default:
      return state
  }
}
