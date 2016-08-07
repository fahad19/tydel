# Model

Instance methods listed below.

Models also expose a few more methods for the built-in event system, which is explained in [Watcher](../guides/watcher.md) section.

### destroy

> destroy()

Destroys the model, and cleans up its watchers.

### getIn

> getIn(paths)

Returns the value in given path.

For example:

```js
const firstBookTitle = author.getIn(['books', 0, 'title']);

// same as:
// author.books.at(0).title;
```

### toJS

> toJS()

Returns a plain JavaScript object from all its properties, as well as nested Models and Collections.
