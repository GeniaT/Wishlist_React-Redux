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
        {
          name: "CLRS",
          description: "algorithms focused book",
          picture: "http://flickr.com/test1",
          urlToBuy: "https://amazon.com/furni1",
          appriximatePrice: '89$',
          note: "linear Algebra as prerequisite"
        },
        {
          name: "Linear Algebra",
          description: "",
          picture: "http://flickr.com/test1",
          urlToBuy: "https://amazon.com/furni1",
          appriximatePrice: '50$',
          note: "math++"
        },
        {
          name: "Algorithm Design Manual",
          description: "",
          picture: "http://flickr.com/test1",
          urlToBuy: "https://amazon.com/furni1",
          appriximatePrice: '35$',
          note: "lets make it right"
        },
        {
          name: "MIT 6 Math for CS",
          description: "",
          picture: "http://flickr.com/test1",
          urlToBuy: "https://amazon.com/furni1",
          appriximatePrice: '50$',
          note: "more math for CS please !"
        }
      ]
    }
  ],
  events: [
    {
      id: '1337',
      date: '01/03/2019',
      status:'public',
      title: 'tennis tournament',
      participants: ['Genia'],
      items: [
        {
          name: "Tennis racket",
          description: "Babolat",
          picture: "http://flickr.com/test1",
          urlToBuy: "https://amazon.com/furni1",
          appriximatePrice: '335$',
          note: "lets make it right"
        },
        {
          name: "balls",
          description: "",
          picture: "http://flickr.com/test1",
          urlToBuy: "https://amazon.com/furni1",
          appriximatePrice: '20$',
          note: "2x4 minimum"
        }
      ],
      reservedItems: ["balls"],
      note: "Need the necessary stuff to play!"
    }
  ],
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
      let updating = false;
      // check if it's a new wishlist or an update:
      state.wishlists.forEach((list, index) => {
        if (list.id === action.wishlist.id) {
          updating = true;
          return {
            ...state,
            wishlists: [
              ...state.wishlists,
              state.wishlists[index] = action.wishlist
            ]
          }
        }
      });

      if (updating === false) { //creation.
        return {
            ...state,
            wishlists: [...state.wishlists, action.wishlist]
        }
      }
      updating = false;
    case 'SAVE_EVENT':
      updating = false;
      // Check if it's a new event or an update:
      state.events.forEach((ev, index) => {
        if (ev.id === action.ev.id) {
          updating = true;
          return {
            ...state,
            events: [
              ...state.events,
              state.events[index] = action.ev
            ]
          }
        }
      });

      if (updating === false) {
        return {
          ...state,
          events: [...state.events, action.ev]
        }
      }
      updating = false;
    default:
      return state;
  }
}

export default reducer;
