# Quickstart

See [getting started guides](../getting-started/types.md) to have more in-depth understanding of the concepts.

This quickstart guide is only for getting you up and running with code examples very quickly.

## Define classes

```js
import { Types, createModel, createCollection } from 'tydel';

// Model class
const Todo = createModel({
  title: Types.string, // or, Types.string.isRequired
  completed: Types.bool // or, Types.bool.defaults(false)
}, {
  setTitle(newTitle) {
    this.title = newTitle;
  }
});

// Collection class, for a specific Model
const Todos = createCollection(Todo);
```

## Instantiate classes

```js
// Model instance
const todo = new Todo({
  title: 'First task',
  completed: false
});

// Collection instance
const todos = new Todos();
```

## Model usage

```js
// access properties
console.log(todo.title); // `First task`

// properties are immutable
todo.title = 'First task title changed';
console.log(todo.title); // still `First task`

// mutate them via methods
todo.setTitle('First task [updated]');
console.log(todo.title); // `First task [updated]`
```

## Collection usage

```js
// lets push the model to collection
todos.push(todo);
console.log(todos.length); // `1`

todos.push(new Todo({
  title: 'My second task',
  completed: false
}));
console.log(todos.length); // `2`

// let's take the last model out of the collection
const lastTodo = todos.pop();
console.log(lastTodo); // `My second task`
```

## Watchers

```js
// listen for changes
const modelWatcher = todo.on('change', function () {
  console.log('todo model has been changed');
});

todo.setTitle('First task [updated again]'); // prints out `todo has been changed` in console

modelWatcher(); // stops listening

const collectionWatcher = todos.on('change', function () {
  console.log('todos collection has changed');
});

collectionWatcher(); // stops listening
```

