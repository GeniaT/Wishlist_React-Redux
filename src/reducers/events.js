import moment from 'moment';

const initialState = [];

export default function events(state = initialState, action) {
  switch (action.type) {
    case 'SET_EVENTS':
      return action.events;
      break;
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

      if (updating === false && action.ev.title) {

        return [...state.concat(action.ev)]
      }
      updating = false;
      return state;
      break;
    default:
      return state
  }
}
