import moment from 'moment';

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
      date: moment('2018-02-08T02:00:00.000Z'),
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
    },
    {
      id: '1338',
      date: moment('2019-02-08T02:00:00.000Z'),
      status:'public',
      title: 'dancing time',
      participants: ['Genia'],
      items: [],
    },
    {
      id: '1339',
      date: moment('2020-03-08T02:00:00.000Z'),
      status:'public',
      title: 'hanging out with friends',
      participants: ['Genia'],
      items: [],
    },
    {
      id: '1340',
      date: moment('2017-02-08T02:00:00.000Z'),
      status:'public',
      title: 'birthday Alex',
      participants: ['Genia'],
      items: [],
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
      return;
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
