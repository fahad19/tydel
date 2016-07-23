# Collections

Collections are arrays of Models, and to be more precise, they contain Models of a specific single class.

For example a Todos collection consisting of only Todo models.

## Create a class

```js
import { createCollection } from 'tydel';

const Todos = createCollection(Todo); // passing the Todo model class
```

## Create an instance

```js
// empty instance
const todos = new Todos();

// instance with some models data
const todos = new Todos([
  { title: 'First task' }, // will be converted to Todo instances
  { title: 'Second task'}
]);

// instance with some model instances
const todos = new Todos([
  new Todo({ title: 'First task' }),
  new Todo({ title: 'Second task' })
]);
```

## Methods

You can make new methods available to your collection instances as follows:

```js
const Todos = createCollection(Todo, {
  doSomething() {
    return true;
  }
});
```

Collection instances also come with built-in methods like `map`, `filter`, `reduce` just like `Array`. See more in [API Reference](/docs/api/Collection.md).
