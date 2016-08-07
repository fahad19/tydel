# Models

Models are objects that **represent** data. A model can hold data in the form of regular strings, booleans, and even [embed](../guides/embed.md) other Models and Collections.

## Create a class

When creating a Model class, we need to pass a schema (formed of Types) as the first argument:

```js
import { Types, createModel } from 'tydel';

const Todo = createModel({
  title: Types.string.isRequired,
  completed: Types.bool.defaults(false)
});
```

Here, we are creating a new Model class for Todo, and we are providing a schema to it saying `title` is a required string, and `completed` is a boolean value that defaults to `false`.

## Create an instance

```js
const todo = new Todo({
  title: 'My new todo item'
});
```

Since `completed` would default to false, we don't need to pass it during instantiation. But if we didn't provide the `title`, it would throw a new `TypeError`.

## Accessing properties

You can get the values from your model instance just like you would do with a regular plain object:

```js
const title = todo.title; // `My new todo item`
```

## Immutable by default

Model properties are immutable by default. And you can only change them via methods that you define while creating the Model class in the beginning.

```js
todo.title = 'Changing the title'; // has no impact

console.log(todo.title); // still `My new todo item`
```

## Methods

To change any property values, lets extend your Model class a bit more, by passing a new method in the second argument of `createModel()`:

```js
const Todo = createModel({
  title: Types.string.isRequired,
  completed: Types.bool.defaults(false)
}, {
  setTitle(newTitle) {
    this.title = newTitle;
  }
});
```

Now from instance level, we can change the title:

```js
todo.setTitle('Changing the title');

console.log(todo.title); // `Changing the title`
```

## Initializers

`createModel()` accepts a third argument, where you can pass an array of functions accepting the model instance, allowing you to perform some actions when the model class is first instantiated.

```js
const Todo = createModel({
  title: Types.string
}, {
  setTitle(title) {
    this.title = title;
  }
}, [
  function myInitializer(model) {
    // model is the `Todo` instance here
  }
]);
```
