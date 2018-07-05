import { combineReducers } from 'redux';
import events from './events';
import eventsWishlistsLinks from './eventsWishlistsLinks';
import eventsParticipation from './eventsParticipation';
import user from './user';
import wishlists from './wishlists';
import friends from './friends';
import suggestions from './suggestions';
import items from './items';

export default combineReducers({
  events,
  eventsParticipation,
  eventsWishlistsLinks,
  user,
  wishlists,
  friends,
  suggestions,
  items
});
