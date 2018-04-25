import moment from 'moment';

const initialState = {
  loggedIn: true,
  wishlists: [
    {
      id: "cc6ddad2-434b-4c6c-91be-03271476ed4e",
      title: "Books for computer Science",
      category: "books",
      status: "private",
      createdAt: moment('2018-04-17T09:18:57.610Z'),
      eventLinksIds: [],
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
    },{
        id: "dd6ddad2",
        title: "Video Games for PC",
        category: "books",
        status: "private",
        createdAt: moment('2016-02-14T09:16:50.610Z'),
        eventLinks: [],
        items: []
    }

  ],
  events: [
    {
      id: '1337',
      date: moment('2018-02-08T02:00:00.000Z'),
      createdAt: '20180423',
      status:'public',
      title: 'tennis tournament',
      participants: ['Genia'],
      wishlistLinksIds: [],
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
      createdAt: '20180923',
      status:'public',
      title: 'dancing time',
      participants: ['Genia'],
      wishlistLinksIds: [],
      items: [],
    },
    {
      id: '1339',
      date: moment('2020-03-08T02:00:00.000Z'),
      createdAt: '20170923',
      status:'public',
      title: 'hanging out with friends',
      participants: ['Genia'],
      wishlistLinksIds: [],
      items: [],
    },
    {
      id: '1340',
      date: moment('2017-02-08T02:00:00.000Z'),
      createdAt: '20160923',
      status:'public',
      title: 'birthday Alex',
      participants: ['Genia'],
      wishlistLinksIds: [],
      items: [],
    }
  ],
  eventsWishlistsLinks: [
    ['X','cc6ddad2-434b-4c6c-91be-03271476ed4e','dd6ddad2'],
    ['1338', 1,0],
    ['1339', 0,1]
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
    case 'DELETE_WISHLIST':
      console.log('deleting wishlist in the reducer ! ');
      console.log('wishlist id:', action.wishlistId);
      return {
        ...state,
        wishlists: state.wishlists.filter((wishlist) => wishlist.id !== action.wishlistId)
      }
      break;
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
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter((ev) => ev.id !== action.eventId)
      }
      break;
    case 'UPDATE_EVENTS_WISHLISTS_LINKS_MATRIX':
      switch (action.operation) {
        case 'wishlistCreation':
          //for each event that I checked in wishlistform, I push a 1 in the matrix.
          state.eventsWishlistsLinks.forEach((x) => {
            if (action.linksIds.indexOf(x[0]) !== -1) {
              x.push(1);
            } else {
              x.push(0);
            }
          });
          state.eventsWishlistsLinks[0][state.eventsWishlistsLinks[0].lastIndexOf(0)] = action.id;
          break;
        case 'wishlistUpdate':
          const wishlistIndexFromMatrix = state.eventsWishlistsLinks[0].indexOf(action.id);
          //For each event checked in wishlistform, I set a 1 to link it to the wishlistId in the matrix
          for (let i = 1; i < state.eventsWishlistsLinks.length; i++) {
            if (action.linksIds.indexOf(state.eventsWishlistsLinks[i][0]) !== -1) {
              state.eventsWishlistsLinks[i][wishlistIndexFromMatrix] = 1;
            } else {
              state.eventsWishlistsLinks[i][wishlistIndexFromMatrix] = 0;
            }
          }
          break;
        case 'wishlistDeletion':
          //Detect the id of the clicked wishlist
          //update the matrix removing wishlist column and all links to events

        case 'eventCreation':
          //a new Arr represents a new event, filled with 0. Then if a link is found with a wishlist from eventForm,
          //we write 1 in the matrix.
          const newEventArr = new Array(state.eventsWishlistsLinks[0].length);
          newEventArr.fill(0);
          newEventArr.forEach((x, index) => {
            if (action.linksIds.indexOf(state.eventsWishlistsLinks[0][index]) !== -1) {
              newEventArr[index] = 1
            }
          });
          newEventArr[0] = action.id;
          state.eventsWishlistsLinks.push(newEventArr);
          break;
        case 'eventUpdate':
          //Detection of the row in the matrix to update
          let eventRowNrFromMatrix = '';
          state.eventsWishlistsLinks.forEach((row, index) => {
            if (row[0] === action.id) {
              eventRowNrFromMatrix = index;
              return;
            }
          });
          //for each column in the matrix except eventsids (1st one), a wishlist
          // has been linked to the event, I set a 1 in the intersection of wishlist id and event id
          for (let i = 1; i < state.eventsWishlistsLinks[0].length; i++) {
            if (action.linksIds.indexOf(state.eventsWishlistsLinks[0][i]) !== -1) {
              state.eventsWishlistsLinks[eventRowNrFromMatrix][i] = 1;
            } else {
              state.eventsWishlistsLinks[eventRowNrFromMatrix][i] = 0;
            }
          }
          break;
        case 'eventDeletion':
        default: return state;
      }

    default:
      return state;
  }
}

export default reducer;
