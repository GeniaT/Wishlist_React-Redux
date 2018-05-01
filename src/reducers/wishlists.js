import moment from 'moment';

const initialState = [
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
  ]

export default function wishlists(state = initialState, action) {
  switch(action.type) {
    case 'ADD_TO_WISHLIST':
      return {
        ...state,
        wishlist: [...state.wishlist, action.element]
      }
    case 'SAVE_WISHLIST':
      let updating = false;
      // check if it's a new wishlist or an update:
      state.forEach((list, index) => {
        if (list.id === action.wishlist.id) {
          updating = true;
          state[index] = action.wishlist
        }
      });

      if (updating === false) { //creation.
        return [...state.concat(action.wishlist)];
      }
      updating = false;
      // return;
    case 'DELETE_WISHLIST':
      return [...state.filter((wishlist) => wishlist.id !== action.wishlistId)]
      break;
    default:
      return state
  }
}
