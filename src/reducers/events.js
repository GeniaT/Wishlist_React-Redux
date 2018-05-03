import moment from 'moment';

const initialState = [
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
]


export default function events(state = initialState, action) {
  switch (action.type) {
    case 'EVENT_DELETE':
      return [...state.filter((ev) => ev.id !== action.eventId)]
      break;
    case 'EVENT_SAVE':
      let updating = false;
      // Check if it's a new event or an update:
      state.forEach((ev, index) => {
        if (ev.id === action.ev.id) {
          updating = true;
          state[index] = action.ev;
        }
      });

      if (updating === false) {
        return [...state.concat(action.ev)]
      }
      updating = false;
      return state;
      break;
    default:
      return state
  }
}
