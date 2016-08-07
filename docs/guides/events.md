# Events

Tydel implements methods for its internal events system in both Models and Collection instances.

### on

> on(eventName, fn)

Example:

```js
const listener = model.on('something', function () {
  console.log('something happened');
});

listener(); // cancels listener
```

### off

> off(eventName, fn)

Example:

```js
// cancels all `something` event listeners
model.off('something');

// cancels specific listener for `something`
const fn = () => console.log('something happened');
model.on('something', fn);
model.off('something', fn);
```

### trigger

> trigger(eventName)

Example:

```js
model.on('something', function () {
  console.log(arguments);
});

model.trigger('something'); // prints `[]`
modeel.trigger('something', 'some value'); // prints `['some value']`
```
