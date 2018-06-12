const initialState = [];

// this will be a global temporary state that may be fed by friends suggestions, wishlists suggestions,... from various searches
export default function suggestions(state = initialState, action) {
  switch (action.type) {
    case 'SET_POTENTIAL_FRIENDS':
      return action.suggestions;
      break;
    default:
      return state
  }
}
