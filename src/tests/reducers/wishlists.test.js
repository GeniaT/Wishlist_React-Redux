import wishlistsReducer from '../../reducers/wishlists';
import myWishlists from '../dataForTest/wishlists';

test('Should set the default state before any manual action', () => {
  const action = {type: '@@INIT'}
  const state = wishlistsReducer(undefined, action);
  expect(state).toEqual([]);
});

//Wishlist deletion
test('Should delete an wishlist if a valid id is provided', () => {
  const action = {type: 'WISHLIST_DELETE', wishlistId: 'fcvg67'};
  const state = wishlistsReducer(myWishlists, action);
  expect(state).toEqual([myWishlists[0],myWishlists[1],myWishlists[2]]);
});

test('Should return the state if no valid wishlist id is provided', () => {
  const action = {type: 'WISHLIST_DELETE', wishlistId: '99jh3'};
  const state = wishlistsReducer(myWishlists, action);
  expect(state).toEqual([...myWishlists]);
});


test('Should return the state if no wishlist id is provided at all', () => {
  const action = {type: 'WISHLIST_DELETE'};
  const state = wishlistsReducer(myWishlists, action);
  expect(state).toEqual([...myWishlists]);
});

//Wishlist saving
test('Should add the wishlist to state if the id is different from other wishlists', () => {
  const action = {
    type: 'WISHLIST_SAVE',
    wishlist: {
      id:'99jh3',
      createdAt: '20101020',
      status: "Private",
      title:'Roller stuff',
      category: 'Shoes',
      eventLinksIds: ['adc34','tui56'],
      items: []
    }
  };
  const state = wishlistsReducer(myWishlists, action);
  expect(state).toEqual([...myWishlists.concat(action.wishlist)]);
});

test('Should modify an existing wishlist if the id matches an wishlist from state', () => {
  const action = {
    type: 'WISHLIST_SAVE',
    wishlist: {
      id: myWishlists[0].id,
      createdAt: '20131020',
      status: "Public",
      title:'For The Kitchen',
      category: 'cook tools',
      eventLinksIds: ['tui56'],
      tags: ["summer","holiday"],
      items: [
        {
          name: "pages collector",
          description: "many pages to read",
          picture: "http://bookPicture",
          urlToBuy: "https://amazon.com/buyIt",
          appriximatePrice: '39$',
          note: "written by Tion Douglas"
        }
      ]
    }
  };
  const state = wishlistsReducer(myWishlists, action);
  expect(state[0].createdAt).toBe('20131020');
  expect(state[0].status).toBe("Public");
  expect(state[0].title).toBe('For The Kitchen');
  expect(state[0].category).toBe('cook tools');
  expect(state[0].eventLinksIds).toEqual(['tui56']);
  expect(state[0].tags).toEqual(["summer","holiday"]);
  expect(state[0].items.length).toBe(1);
  expect(state[0].items[0].name).toBe('pages collector');
  expect(state[0].items[0].description).toBe('many pages to read');
  expect(state[0].items[0].picture).toBe("http://bookPicture");
  expect(state[0].items[0].urlToBuy).toBe("https://amazon.com/buyIt");
  expect(state[0].items[0].appriximatePrice).toBe('39$');
  expect(state[0].items[0].note).toBe("written by Tion Douglas");
});

test('During update, other wishlists should remain the same.', () => {
  const action = {
    type: 'WISHLIST_SAVE',
    wishlist: {
      id: myWishlists[0].id,
      createdAt: '20131020',
      status: "Public",
      title:'For The Kitchen',
      category: 'cook tools',
      eventLinksIds: ['tui56'],
      tags: ["summer","holiday"],
      items: [
        {
          name: "pages collector",
          description: "many pages to read",
          picture: "http://bookPicture",
          urlToBuy: "https://amazon.com/buyIt",
          appriximatePrice: '39$',
          note: "written by Tion Douglas"
        }
      ]
    }
  };
  const state = wishlistsReducer(myWishlists, action);
  expect(state[1]).toEqual(myWishlists[1]);
  expect(state[2]).toEqual(myWishlists[2]);
  expect(state[3]).toEqual(myWishlists[3]);
});

test('Should return the state if no title is provided in the wishlist object', () => {
  const action = {
    type: 'WISHLIST_SAVE',
    wishlist: {
      id: '9966fg',
      status: "Public"
    }
  };
  const state = wishlistsReducer(myWishlists, action);
  expect(state).toEqual([...myWishlists]);
});

test('Should return the state if the wishlist is not an object with properties', () => {
  const action = {
    type: 'WISHLIST_SAVE',
    wishlist: [{title: 'Party of the year'}]
  };
  const state = wishlistsReducer(myWishlists, action);
  expect(state).toEqual([...myWishlists]);
});
