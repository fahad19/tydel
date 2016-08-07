# createCollection

> createCollection(Model, methods = {}, initializers = [])

Returns a [Collection](./Collection.md) class based on the Model class and methods that are provided.

Can be accessed as:

```js
import { createCollection } from 'tydel';
```

### Model

The Model class that you want this Collection to be of.

### methods

Methods are passed in a plain object keyed by their names, and values being the functions that you want exposed from the Collection instance:

```js
import { Types, createModel, createCollection } from 'tydel';

const Book = createModel({
  title: Types.string
});

const Books = createCollection(Book, {
  myCustomMethod() {
    return true;
  }
});
```

Now from your instances you can access the method as:

```js
const books = new Books();

books.myCustomMethod();
```

### initializers

Array of functions, accepting the collection instance as argument, fired when class is intantiated:

```js
const Books = createCollection(Book, {}, [
  function myInitializer(collection) {
    // collection is `Books` instance
  }
]);
```
