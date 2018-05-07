import {
  logIn,
  logOut,
  saveWishlist,
  deleteWishlist,
  saveEvent,
  deleteEvent,
  updateEventsWishlistsLinksMatrix
} from '../../actions/actions';

test('should setup "log in" action object', () => {
  const action = logIn();
  const result = {type: 'LOG_IN'};
  expect(action).toEqual(result);
});

test('should setup "log out" action object', () => {
  const action = logOut();
  const result = {type: 'LOG_OUT'};
  expect(action).toEqual(result);
});

test('should setup "save wishlist" action object', () => {
  const wishlistToSave = {
    id:'123abc',
    createdAt: '20171206',
    status: "Public",
    title:'for gaming room',
    category: 'video Games',
    eventLinks: ["for gaming time"],
    tags: ["PC","games", "PS4"],
    items: []
  }
  const action = saveWishlist(wishlistToSave);
  const result = {
    type: 'WISHLIST_SAVE',
    wishlist: wishlistToSave
  }
  expect(action).toEqual(result);
});

test('should setup "delete wishlist" action object', () => {
  const action = deleteWishlist('123abc');
  const result = {
    type: 'WISHLIST_DELETE',
    wishlistId: '123abc'
  }
  expect(action).toEqual(result);
});

test('should setup "save event" action object', () => {
  const eventToSave = {
    id:'1234lol',
    date: "01/02/2017",
    title: "Kevin's brirthday",
    participants: ['Tamah','Louli','Jerome','Genia'],
    items: ['black t-shirt', "Nike hat"],
    reservedItems: ['Nike hat'],
    note: "Don't offer anything else please"
  }
  const action = saveEvent(eventToSave);
  const result = {
    type: 'EVENT_SAVE',
    ev: eventToSave
  }
  expect(action).toEqual(result);
});

test('should setup "delete event" action object', () => {
  const action = deleteEvent('1322kl');
  const result = {
    type: 'EVENT_DELETE',
    eventId: '1322kl'
  }
  expect(action).toEqual(result);
});

test('should setup "update events and wishlists matrix" action object', () => {
  const action = updateEventsWishlistsLinksMatrix('wishlistCreation', '123abc', ['1339', '1290', '101']);
  const result = {
    type: 'MATRIX_EVENTS_WISHLISTS_LINKS_UPDATE',
    operation: 'wishlistCreation',
    id: '123abc',
    linksIds: ['1339', '1290', '101']
  }
  expect(action).toEqual(result);
});
