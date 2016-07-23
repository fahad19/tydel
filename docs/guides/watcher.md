# Watcher

Tydel implements methods for its internal events system in both Models and Collection instances.

They are:

* `on(eventName, fn)`
* `off(eventName, fn)`
* `trigger(eventName)`

At this point, only `change` event has been implemented, which gets fired whenever a Model or Collection had any changes in them, or their ([embedded](./embed.md)) children.

## Models

From model instances:

```js
const person = new Person({ name: 'Salazar' });

const watcher = person.on('change', function () {
  console.log('person has changed');
});

person.setName('Salazar Slytherin');
// prints out `person has changed` in console

// stop watching
watcher();
```

## Collections

Same like models:

```js
const todos = new Todos();

const watcher = todos.on('change', function () {
  console.log('the collection has changed');
});

todos.push(new Todo({ title: 'blah...' }));
// prints out `the collection has changed` in console

// stop watching
watcher();
```
