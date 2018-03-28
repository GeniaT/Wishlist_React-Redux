import { createStore } from "redux";

let initialState = {
  name: "Genia",
  age: 30
}

//action generators
const increaseAge = () => ({
  type: 'INCREASE_AGE',
  incrementBy: 5
});

const changeName = () => ({
  type: 'CHANGE_NAME'
});

//reducer

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREASE_AGE':
      return {
        age: state.age + action.incrementBy
      }
    case 'CHANGE_NAME':
      return {
        name: 'Steph'
      }
  }
}

const store = createStore(reducer)

store.subscribe(() => {
  console.log(store.getState());
});

// dispatch some actions

store.dispatch(increaseAge());
store.dispatch(changeName());
