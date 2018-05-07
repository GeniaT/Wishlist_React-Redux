import userReducer from '../../reducers/user';

test('Should set the default state before any manual action', () => {
  const action = {type: '@@INIT'}
  const state = userReducer(undefined, action);
  expect(state).toEqual({loggedIn: false});
});

test('Should log out on action', () => {
  const action = {type: 'LOG_OUT'}
  const state = userReducer({loggedIn: true}, action);
  expect(state).toEqual({loggedIn: false});
});

test('Should log in on action', () => {
  const action = {type: 'LOG_IN'}
  const state = userReducer({loggedIn: false}, action);
  expect(state).toEqual({loggedIn: true});
});
