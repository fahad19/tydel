# React

Tydel can already work with [React.js](https://facebook.github.io/react) applications with ease.

See [tydel-react](https://github.com/fahad19/tydel-react) for more info.

## Install

First we need to install `tydel-react`:

```sh
$ npm install --save tydel-react
```

## State model

Let's assume we have our App's state in a root model called `AppState`, and it may look like this:

```js
// ./models/AppState.js

import { Types, createModel } from 'tydel';

import Todos from '../collections/Todos';

export createModel({
  name: Types.string.isRequired,
  todos: Types.collection.of(Todos)
});
```

## Root component

Now we need to make sure that we pass the instace of our `AppState` model, to the root React component of our application.

We can do this via the `<Provider>` component exposed by `tydel-react`:

```js
// ./index.js

import { render } from 'react-dom';
import { Provider } from 'tydel-react';

import App from './containers/App.js'; // Root component
import AppState from './models/AppState'; // Root model

const appState = new AppState({
  name: 'My App Name',
  todos: []
});

render(
  <Provider model={appState}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

## Accessing model

To access the state model from the rest of your application, you can use `connect()` provided by `tydel-react`.

```js
// ./containers/App.js

import { Component } from 'react';

class App extends Component {
  render() {
    const { name } = this.props;

    return (
      <p>
        My app name is: {name}
      </p>
    );
  }
}

export default connect(function (appState) {
  return {
    name: appState.name
  };
})(App);
```

`connect()` basically accepts a function, which receives the `appState`, and then returns an object which is then mapped as props inside your Component.

If you mutate the root model, the bindings will make sure your Components are re-rendered automatically.
