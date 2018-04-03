const initialState = {
  loggedIn: true,
  wishlists: [
    {
      id: "cc6ddad2-434b-4c6c-91be-03271476ed4e",
      title: "Books for computer Science",
      category: "books",
      status: "private",
      eventLinks: [],
      items: [
        {name: "CLRS"},
        {name: "Linear Algebra"},
        {name: "Algorithm Design Manual"},
        {name: "MIT 6 Math for CS"},
      ]
    }
  ]
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
    case 'SAVE_WISHLIST':
      return {
        ...state,
        wishlists: [...state.wishlists, action.wishlist]
      }
    default:
      return state;
  }
}

export default reducer;
