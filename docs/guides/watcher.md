# Watcher

Tydel uses its [events](./events.md) system for exposing watchers.

At this point, only `change` and `method:change` events have been implemented, which gets fired whenever a Model or Collection had any changes in them, or their ([embedded](./embed.md)) children.

* `change`: fired on every single change in properties
* `method:change`: fired once when a single method performs various changes

## Models

From model instances:

```js
const person = new Person({ name: 'Salazar' });

const watcher = person.on('change', function (event) {
  console.log('person has changed in:', event.path);
});

person.setName('Salazar Slytherin');
// prints out `person has changed in: ['name']` in console

// stop watching
watcher();
```

## Collections

Same like models:

```js
const todos = new Todos();

const watcher = todos.on('change', function (event) {
  console.log('the collection has changed');
});

todos.push(new Todo({ title: 'blah...' }));
// prints out `the collection has changed` in console

// stop watching
watcher();
```
