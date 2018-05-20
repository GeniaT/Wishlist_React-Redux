import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { firebase } from './firebase/firebase';
import AppRoutes from './routes/AppRoutes';
import { logIn, startLogin } from './actions/actions';
import store from './store/store';
import './styles/index.scss';
import 'normalize.css';
import 'react-dates/lib/css/_datepicker.css';

const AppProvider = () => (
  <Provider store={store}>
    <AppRoutes />
  </Provider>
)

firebase.auth().onAuthStateChanged(function(user) { //if user data still in memory, we don't display auth popup
  if (user) {
    console.log(user.uid);
    console.log(user.displayName);
    return store.dispatch(logIn(user.uid));
  } else {
    return store.dispatch(startLogin());
  }
});

ReactDOM.render(<AppProvider/>, document.getElementById('app'));
