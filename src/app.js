import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRoutes from './routes/AppRoutes';
import store from './store/store';
import './styles/index.scss';
import 'normalize.css';

const AppProvider = () => (
  <Provider store={store}>
    <AppRoutes />
  </Provider>
)

ReactDOM.render(<AppProvider/>, document.getElementById('app'));
