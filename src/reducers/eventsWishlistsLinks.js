// const initialState = [
//   ['X','cc6ddad2-434b-4c6c-91be-03271476ed4e','dd6ddad2'],
//   ['1338', 1,0],
//   ['1339', 0,1]
// ]

const initialState = [
  ['X']
]
export default function eventsWishlistsLinks(state = initialState, action) {
  switch (action.type) {
    case 'MATRIX_EVENTS_WISHLISTS_LINKS_UPDATE':
      switch (action.operation) {
        case 'wishlistCreation':
          //for each event that I checked in wishlistform, I push a 1 in the matrix.
          state.forEach((x) => {
            if (action.linksIds.indexOf(x[0]) !== -1) {
              x.push(1);
            } else {
              x.push(0);
            }
          });
          state[0][state[0].lastIndexOf(0)] = action.id;
          break;
        case 'wishlistUpdate':
          const wishlistIndexFromMatrix = state[0].indexOf(action.id);
          //For each event checked in wishlistform, I set a 1 to link it to the wishlistId in the matrix
          for (let i = 1; i < state.length; i++) {
            if (action.linksIds.indexOf(state[i][0]) !== -1) {
              state[i][wishlistIndexFromMatrix] = 1;
            } else {
              state[i][wishlistIndexFromMatrix] = 0;
            }
          }
          break;
        case 'wishlistDeletion':
          //Detect the id of the clicked wishlist
          //update the matrix removing wishlist column with all links to events
          const index = state[0].indexOf(action.id);
          state.forEach((arr) => arr.splice(index, 1));
          break;
        case 'eventCreation':
          //a new Arr represents a new event, filled with 0. Then if a link is found with a wishlist from eventForm,
          //we write 1 in the matrix.
          const newEventArr = new Array(state[0].length);
          newEventArr.fill(0);
          newEventArr.forEach((x, index) => {
            if (action.linksIds.indexOf(state[0][index]) !== -1) {
              newEventArr[index] = 1
            }
          });
          newEventArr[0] = action.id;
          state.push(newEventArr);
          break;
        case 'eventUpdate':
          //Detection of the row in the matrix to update
          let eventRowNrFromMatrix = '';
          state.forEach((row, index) => {
            if (row[0] === action.id) {
              eventRowNrFromMatrix = index;
              return;
            }
          });
          //for each column in the matrix except eventsids (1st one), a wishlist
          // has been linked to the event, I set a 1 in the intersection of wishlist id and event id
          for (let i = 1; i < state[0].length; i++) {
            if (action.linksIds.indexOf(state[0][i]) !== -1) {
              state[eventRowNrFromMatrix][i] = 1;
            } else {
              state[eventRowNrFromMatrix][i] = 0;
            }
          }
          break;
        case 'eventDeletion':
          //Detect the event id
          //update the matrix so the row with the event id is removed.
          let eventRowNr;
          new Promise((resolve) => {
            state.forEach((row, index) => {
              if (row[0] === action.id) {
                eventRowNr = index;
                return;
              }
            });
          })
          .then(state.splice(eventRowNr, 1));
          break;
        default:
          return state;
      }

    default:
      return state;
  }
}
