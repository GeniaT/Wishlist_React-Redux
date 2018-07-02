const initialState = [];

export default function eventsParticipation(state = initialState, action) {
  switch (action.type) {
    case 'SET_EVENTS_PARTICIPATION':
      return [...action.eventsParticipation];
      break;
    default:
      return state
  }
}
