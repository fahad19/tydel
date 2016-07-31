import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'tydel-react';

import 'todomvc-app-css/index.css';

import App from './containers/App';
import AppState from './models/AppState';

const appState = new AppState({
  todos: []
});

window.appState = appState;

render(
  <Provider model={appState}>
    <App />
  </Provider>,
  document.getElementById('root')
);
