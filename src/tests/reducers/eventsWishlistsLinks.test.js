import eventsWishlistsLinksReducer from '../../reducers/eventsWishlistsLinks';
//2D array represents possible links betweens events and wishlists.
//1st row represents the wishlists IDs and 1st column the events ids.
//'1' represents a link between a wishlist and an event.

test('Should set the default state before any manual action', () => {
  const action = {type: '@@INIT'}
  const state = eventsWishlistsLinksReducer(undefined, action);
  expect(state).toEqual([['X']]);
});

//WISHLIST CREATION
test('Should push a new wishlist id in the empty matrix', () => {
  const action = {
    type: 'MATRIX_EVENTS_WISHLISTS_LINKS_UPDATE',
    operation: 'wishlistCreation',
    id: 'dfg34',
    linksIds: []
  }
  const initialState = [['X']];
  const state = eventsWishlistsLinksReducer(initialState, action);
  expect(state).toEqual([['X','dfg34']]);
});

test('Should push a new wishlist id after existing wishlists', () => {
  const action = {
    type: 'MATRIX_EVENTS_WISHLISTS_LINKS_UPDATE',
    operation: 'wishlistCreation',
    id: 'dfg34',
    linksIds: []
  }
  const initialState = [['X','klfh14']];
  const state = eventsWishlistsLinksReducer(initialState, action);
  expect(state).toEqual([['X','klfh14','dfg34']]);
});

test('Should push a new wishlist id event if linksIds are not provided', () => {
  const action = {
    type: 'MATRIX_EVENTS_WISHLISTS_LINKS_UPDATE',
    operation: 'wishlistCreation',
    id: 'dfg34'
  }
  const initialState = [['X','klfh14']];
  const state = eventsWishlistsLinksReducer(initialState, action);
  expect(state).toEqual([['X','klfh14','dfg34']]);
});

test('Should push a new wishlist column if other events exist', () => {
  const action = {
    type: 'MATRIX_EVENTS_WISHLISTS_LINKS_UPDATE',
    operation: 'wishlistCreation',
    id: 'dfg34',
    linksIds: []
  }
  const initialState = [
    ['X','klfh14'],
    ['1339',0],
    ['1234',0]
  ];
  const state = eventsWishlistsLinksReducer(initialState, action);
  expect(state).toEqual([
    ['X','klfh14','dfg34'],
    ['1339',0,0],
    ['1234',0,0]
  ]);
});

test('Should push a new wishlist column and set "1" to linked events', () => {
  const action = {
    type: 'MATRIX_EVENTS_WISHLISTS_LINKS_UPDATE',
    operation: 'wishlistCreation',
    id: 'dfg34',
    linksIds: ['1234']
  }
  const initialState = [
    ['X','klfh14'],
    ['1339',0],
    ['1234',0]
  ];
  const state = eventsWishlistsLinksReducer(initialState, action);
  expect(state).toEqual([
    ['X','klfh14','dfg34'],
    ['1339',0,0],
    ['1234',0,1]
  ]);
});

//WISHLIST UPDATE
test('Should update the matrix based on provided links, the rest of matrix isnt changed', () => {
  const action = {
    type: 'MATRIX_EVENTS_WISHLISTS_LINKS_UPDATE',
    operation: 'wishlistUpdate',
    id: 'dfg34',
    linksIds: ['1339','7825']
  }
  const initialState = [
    ['X','klfh14','dfg34'],
    ['1339',1,0],
    ['1234',0,1],
    ['7825',0,0]
  ];
  const state = eventsWishlistsLinksReducer(initialState, action);
  expect(state).toEqual([
    ['X','klfh14','dfg34'],
    ['1339',1,1],
    ['1234',0,0],
    ['7825',0,1]
  ]);
});
//WISHLIST DELETION
test('In a matrix without events, remove the provided id from matrix top row', () => {
  const action = {
    type: 'MATRIX_EVENTS_WISHLISTS_LINKS_UPDATE',
    operation: 'wishlistDeletion',
    id: '29uiw1',
    linksIds: []
  }
  const initialState = [['X','klfh14','29uiw1','dfg34']]
  const state = eventsWishlistsLinksReducer(initialState, action);
  expect(state).toEqual([['X','klfh14','dfg34']]);
});

test('In a matrix with events, remove the column of the provided wishlist id', () => {
  const action = {
    type: 'MATRIX_EVENTS_WISHLISTS_LINKS_UPDATE',
    operation: 'wishlistDeletion',
    id: '29uiw1',
    linksIds: []
  }
  const initialState = [
    ['X','klfh14','29uiw1','dfg34'],
    ['1339',0,0,0],
    ['1234',0,0,0]
  ]
  const state = eventsWishlistsLinksReducer(initialState, action);
  expect(state).toEqual([
    ['X','klfh14','dfg34'],
    ['1339',0,0],
    ['1234',0,0]
  ]);
});

test('In a matrix with events and existing links, remove the column of the provided wishlist id only', () => {
  const action = {
    type: 'MATRIX_EVENTS_WISHLISTS_LINKS_UPDATE',
    operation: 'wishlistDeletion',
    id: '29uiw1',
    linksIds: []
  }
  const initialState = [
    ['X','klfh14','29uiw1','dfg34'],
    ['1339',0,1,0],
    ['1234',1,0,1]
  ]
  const state = eventsWishlistsLinksReducer(initialState, action);
  expect(state).toEqual([
    ['X','klfh14','dfg34'],
    ['1339',0,0],
    ['1234',1,1]
  ]);
});

test('Should return the same state if invalid wishlist id is provided', () => {
  const action = {
    type: 'MATRIX_EVENTS_WISHLISTS_LINKS_UPDATE',
    operation: 'wishlistDeletion',
    id: '999xx',
    linksIds: []
  }
  const initialState = [
    ['X','klfh14','29uiw1','dfg34'],
    ['1339',0,1,0],
    ['1234',1,0,1]
  ]
  const state = eventsWishlistsLinksReducer(initialState, action);
  expect(state).toEqual([
    ['X','klfh14','29uiw1','dfg34'],
    ['1339',0,1,0],
    ['1234',1,0,1]
  ]);
});

test('Should remove the column of the provided wishlist id, even if linksIds are provided', () => {
  const action = {
    type: 'MATRIX_EVENTS_WISHLISTS_LINKS_UPDATE',
    operation: 'wishlistDeletion',
    id: '29uiw1',
    linksIds: ['1339','1234']
  }
  const initialState = [
    ['X','klfh14','29uiw1','dfg34'],
    ['1339',0,1,0],
    ['1234',1,0,1]
  ]
  const state = eventsWishlistsLinksReducer(initialState, action);
  expect(state).toEqual([
    ['X','klfh14','dfg34'],
    ['1339',0,0],
    ['1234',1,1]
  ]);
});

//EVENT CREATION
test('Should add a new event id at the bottom of the empty matrix', () => {
  const action = {
    type: 'MATRIX_EVENTS_WISHLISTS_LINKS_UPDATE',
    operation: 'eventCreation',
    id: '29uiw1',
    linksIds: []
  }
  const initialState = [['X']];
  const state = eventsWishlistsLinksReducer(initialState, action);
  expect(state).toEqual([
    ['X'],
    ['29uiw1']
  ]);
});

test('Should add a new event id after existing events', () => {
  const action = {
    type: 'MATRIX_EVENTS_WISHLISTS_LINKS_UPDATE',
    operation: 'eventCreation',
    id: '29uiw1',
    linksIds: []
  }
  const initialState = [
    ['X'],
    ['1339'],
    ['1234']
  ]
  const state = eventsWishlistsLinksReducer(initialState, action);
  expect(state).toEqual([
    ['X'],
    ['1339'],
    ['1234'],
    ['29uiw1']
  ]);
});

test('Should add a new event id even if linksIds are not provided', () => {
  const action = {
    type: 'MATRIX_EVENTS_WISHLISTS_LINKS_UPDATE',
    operation: 'eventCreation',
    id: '29uiw1'
  }
  const initialState = [
    ['X'],
    ['1339'],
    ['1234']
  ]
  const state = eventsWishlistsLinksReducer(initialState, action);
  expect(state).toEqual([
    ['X'],
    ['1339'],
    ['1234'],
    ['29uiw1']
  ]);
});

test('Should add a new event row if other wishlists exist', () => {
  const action = {
    type: 'MATRIX_EVENTS_WISHLISTS_LINKS_UPDATE',
    operation: 'eventCreation',
    id: '29uiw1',
    linksIds: []
  }
  const initialState = [
    ['X', 'zeds21', 'opl56', 'eds21'],
    ['1339',0,0,0],
    ['1234',0,0,0],
  ]
  const state = eventsWishlistsLinksReducer(initialState, action);
  expect(state).toEqual([
    ['X', 'zeds21', 'opl56', 'eds21'],
    ['1339',0,0,0],
    ['1234',0,0,0],
    ['29uiw1',0,0,0]
  ]);
});

test('Should add a new event row and set "1" to linked wishlists', () => {
  const action = {
    type: 'MATRIX_EVENTS_WISHLISTS_LINKS_UPDATE',
    operation: 'eventCreation',
    id: '29uiw1',
    linksIds: ['eds21','opl56']
  }
  const initialState = [
    ['X', 'zeds21', 'opl56', 'eds21'],
    ['1339',0,0,0],
    ['1234',0,0,0],
  ]
  const state = eventsWishlistsLinksReducer(initialState, action);
  expect(state).toEqual([
    ['X', 'zeds21', 'opl56', 'eds21'],
    ['1339',0,0,0],
    ['1234',0,0,0],
    ['29uiw1',0,1,1]
  ]);
});
//EVENT UPDATE
test('Should update the matrix based on provided links, the rest of matrix isnt changed', () => {
  const action = {
    type: 'MATRIX_EVENTS_WISHLISTS_LINKS_UPDATE',
    operation: 'eventUpdate',
    id: '7825',
    linksIds: ['klfh14','dfg34']
  }
  const initialState = [
    ['X','klfh14','dfg34','ftr56'],
    ['1339',1,0,0],
    ['1234',0,1,0],
    ['7825',0,0,1]
  ];
  const state = eventsWishlistsLinksReducer(initialState, action);
  expect(state).toEqual([
    ['X','klfh14','dfg34', 'ftr56'],
    ['1339',1,0,0],
    ['1234',0,1,0],
    ['7825',1,1,0]
  ]);
});
//EVENT DELETION
test('In a matrix without wishlists, remove the provided id from matrix first column', () => {
  const action = {
    type: 'MATRIX_EVENTS_WISHLISTS_LINKS_UPDATE',
    operation: 'eventDeletion',
    id: '7825',
    linksIds: []
  }
  const initialState = [
    ['X'],
    ['1339'],
    ['1234'],
    ['7825']
  ]
  const state = eventsWishlistsLinksReducer(initialState, action);
  expect(state).toEqual([
    ['X'],
    ['1339'],
    ['1234']
  ]);
});

test('In a matrix with wishlists, remove the row of the event id', () => {
  const action = {
    type: 'MATRIX_EVENTS_WISHLISTS_LINKS_UPDATE',
    operation: 'eventDeletion',
    id: '7825',
    linksIds: []
  }
  const initialState = [
    ['X','klfh14','dfg34','ftr56'],
    ['1339',0,0,0],
    ['1234',0,0,0],
    ['7825',0,0,0]
  ]
  const state = eventsWishlistsLinksReducer(initialState, action);
  expect(state).toEqual([
    ['X','klfh14','dfg34','ftr56'],
    ['1339',0,0,0],
    ['1234',0,0,0]
  ]);
});

test('In a matrix with wishlists and existing links, remove the row of provided event id only', () => {
  const action = {
    type: 'MATRIX_EVENTS_WISHLISTS_LINKS_UPDATE',
    operation: 'eventDeletion',
    id: '7825',
    linksIds: []
  }
  const initialState = [
    ['X','klfh14','dfg34','ftr56'],
    ['1339',1,0,0],
    ['1234',0,1,0],
    ['7825',0,0,1]
  ]
  const state = eventsWishlistsLinksReducer(initialState, action);
  expect(state).toEqual([
    ['X','klfh14','dfg34','ftr56'],
    ['1339',1,0,0],
    ['1234',0,1,0]
  ]);
});

test('Should return the same state if invalid event id is provided', () => {
  const action = {
    type: 'MATRIX_EVENTS_WISHLISTS_LINKS_UPDATE',
    operation: 'eventDeletion',
    id: '99pkl',
    linksIds: []
  }
  const initialState = [
    ['X','klfh14','dfg34','ftr56'],
    ['1339',1,0,0],
    ['1234',0,1,0],
    ['7825',0,0,1]
  ]
  const state = eventsWishlistsLinksReducer(initialState, action);
  expect(state).toEqual([
    ['X','klfh14','dfg34','ftr56'],
    ['1339',1,0,0],
    ['1234',0,1,0],
    ['7825',0,0,1]
  ]);
});

test('Should remove the row of the provided event id, even if linksIds are provided', () => {
  const action = {
    type: 'MATRIX_EVENTS_WISHLISTS_LINKS_UPDATE',
    operation: 'eventDeletion',
    id: '7825',
    linksIds: ['dfg34','ftr56']
  }
  const initialState = [
    ['X','klfh14','dfg34','ftr56'],
    ['1339',1,0,0],
    ['1234',0,1,0],
    ['7825',0,0,1]
  ]
  const state = eventsWishlistsLinksReducer(initialState, action);
  expect(state).toEqual([
    ['X','klfh14','dfg34','ftr56'],
    ['1339',1,0,0],
    ['1234',0,1,0]
  ]);
});
