import { combineReducers } from 'redux';
import events from './events';
import eventsWishlistsLinks from './eventsWishlistsLinks';
import user from './user';
import wishlists from './wishlists';
import friends from './friends';

export default combineReducers({
  events,
  eventsWishlistsLinks,
  user,
  wishlists,
  friends
});
