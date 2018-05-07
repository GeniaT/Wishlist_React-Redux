import eventsReducer from '../../reducers/events';
import myEvents from '../dataForTest/events';

//during init
test('Should set the default state before any manual action', () => {
  const action = {type: '@@INIT'};
  const state = eventsReducer(undefined, action);
  expect(state).toEqual([]);
});

//Event deletion
test('Should delete an event if a valid id is provided', () => {
  const action = {type: 'EVENT_DELETE', eventId: '18jh3'};
  const state = eventsReducer(myEvents, action);
  expect(state).toEqual([myEvents[0],myEvents[2],myEvents[3]]);
});

test('Should return the state if no valid event id is provided', () => {
  const action = {type: 'EVENT_DELETE', eventId: '99jh3'};
  const state = eventsReducer(myEvents, action);
  expect(state).toEqual([...myEvents]);
});


test('Should return the state if no event id is provided at all', () => {
  const action = {type: 'EVENT_DELETE'};
  const state = eventsReducer(myEvents, action);
  expect(state).toEqual([...myEvents]);
});

//Event saving
test('Should add the event to state if the id is different from other events', () => {
  const action = {
    type: 'EVENT_SAVE',
    ev: {
      id: '99jh3',
      title: 'Friendship celebration',
      participants: ['Olivier','Dimitri'],
      items: [],
      note: ''
    }
  };
  const state = eventsReducer(myEvents, action);
  expect(state).toEqual([...myEvents.concat(action.ev)]);
});

test('Should modify an existing event if the id matches an event from state', () => {
  const action = {
    type: 'EVENT_SAVE',
    ev: {
      id: myEvents[2].id,
      date: '25/05/2025',
      title: "Steph's graduation!!!",
      participants: ["May", 'Elo', "Laura",'Genia', 'Valerie'],
      items: ["SPA session", "massage", "bikini"],
      reservedItems: [],
      note: 'Location to define.'
    }
  };
  const state = eventsReducer(myEvents, action);
  expect(state[2].date).toBe('25/05/2025');
  expect(state[2].title).toBe("Steph's graduation!!!");
  expect(state[2].participants).toEqual(["May", 'Elo', "Laura",'Genia', 'Valerie']);
  expect(state[2].items).toEqual(["SPA session", "massage", "bikini"]);
  expect(state[2].reservedItems).toEqual([]);
  expect(state[2].note).toBe('Location to define.');
});

test('During update, other events should remain the same.', () => {
  const action = {
    type: 'EVENT_SAVE',
    ev: {
      id: myEvents[2].id,
      date: '25/05/2025',
      title: "Steph's graduation!!!",
      participants: ["May", 'Elo', "Laura",'Genia', 'Valerie'],
      items: ["SPA session", "massage", "bikini"],
      reservedItems: [],
      note: 'Location to define.'
    }
  };
  const state = eventsReducer(myEvents, action);
  expect(state[0]).toEqual(myEvents[0]);
  expect(state[1]).toEqual(myEvents[1]);
  expect(state[3]).toEqual(myEvents[3]);
});

test('Should return the state if no title is provided in the event object', () => {
  const action = {
    type: 'EVENT_SAVE',
    ev: {
      id: '9966fg',
      date: '25/05/2035',
    }
  };
  const state = eventsReducer(myEvents, action);
  expect(state).toEqual([...myEvents]);
});

test('Should return the state if the event is not an object with properties', () => {
  const action = {
    type: 'EVENT_SAVE',
    ev: [{title: 'Party of the year'}]
  };
  const state = eventsReducer(myEvents, action);
  expect(state).toEqual([...myEvents]);
});
