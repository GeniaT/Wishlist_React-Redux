import { combineReducers } from 'redux';
import events from './events';
import eventsWishlistsLinks from './eventsWishlistsLinks';
import eventsParticipation from './eventsParticipation';
import user from './user';
import wishlists from './wishlists';
import friends from './friends';
import suggestions from './suggestions';
import items from './items';

const appReducer = combineReducers({
  events,
  eventsParticipation,
  eventsWishlistsLinks,
  user,
  wishlists,
  friends,
  suggestions,
  items
});

export const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    state = undefined
  }
  return appReducer(state, action)
}
