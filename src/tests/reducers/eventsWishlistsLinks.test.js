import eventsWishlistsLinksReducer from '../../reducers/eventsWishlistsLinks';

test('Should set the default state before any manual action', () => {
  const action = {type: '@@INIT'}
  const state = eventsWishlistsLinksReducer(undefined, action);
  expect(state).toEqual([['X']]);
});
