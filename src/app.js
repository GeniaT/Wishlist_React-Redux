import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { firebase } from './firebase/firebase';
import AppRoutes from './routes/AppRoutes';
import { logIn, logOut, createUser } from './actions/user';
import { startFetchingData } from  './actions/stateInit';
import store from './store/store';
import './styles/index.scss';
import 'normalize.css';
import 'react-dates/lib/css/_datepicker.css';

// const AppProvider = () => (
//   <Provider store={store}>
//     <AppRoutes />
//   </Provider>
// )

const AppProvider = (
  <Provider store={store}>
    <AppRoutes />
  </Provider>
)

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(AppProvider, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    createUser(user.uid)
    .then(() => store.dispatch(logIn(user.uid)))
    .then(() => store.dispatch(startFetchingData()))
    .then(() => renderApp())
  } else {
    history.push('/');
    store.dispatch(logOut());
    renderApp();
  }
});
