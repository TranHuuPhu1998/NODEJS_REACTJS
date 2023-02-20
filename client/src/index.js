import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './app/store';
import * as serviceWorker from './serviceWorker';
import { ToastContainer } from 'react-toastify';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
