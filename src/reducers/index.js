import { combineReducers } from 'redux';
import events from './events';
import eventsWishlistsLinks from './eventsWishlistsLinks';
import user from './user';
import wishlists from './wishlists';

export default combineReducers({
  events,
  eventsWishlistsLinks,
  user,
  wishlists
});
