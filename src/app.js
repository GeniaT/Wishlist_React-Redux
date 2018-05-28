import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { firebase } from './firebase/firebase';
import AppRoutes from './routes/AppRoutes';
import { logIn, logOut, createUser } from './actions/actions';
import store from './store/store';
import './styles/index.scss';
import 'normalize.css';
import 'react-dates/lib/css/_datepicker.css';

const AppProvider = () => (
  <Provider store={store}>
    <AppRoutes />
  </Provider>
)

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    return createUser(user.uid).then(() => store.dispatch(logIn(user.uid)));
  } else {
    return store.dispatch(logOut());
  }
});

ReactDOM.render(<AppProvider/>, document.getElementById('app'));
