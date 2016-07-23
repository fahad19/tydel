# Embedding Models and Collections

Models can embed other Models and Collections, and this can go as many levels deep as the data structure demands.

## Models

Let's say we have an individual `Address` model:

```js
import { Types, createModel } from 'tydel';

const Address = createModel({
  street: Types.string.isRequired,
  city: Types.string.isRequired
}, {
  setStreet(street) {
    this.street = street;
  }
});
```

And we also have a `Person` model:

```js
const Person = createModel({
  name: Types.string.isRequired
});
```

If we wish to embed `Address` model in a new schema key `address` in `Person` model, we would do:

```js
const Person = createModel({
  name: Types.string.isRequired,
  address: Types.model.of(Address).isRequired
});
```

Next, if we instantiate a new `Person`:

```js
const person = new Person({
  name: 'Sirius Black',
  address: {
    street: '12 Grimmauld Place',
    city: 'London'
  }
});

// `person` is an instance of Person
// `person.address` is an instance of Address
```

To change the street name of the address, we would access the method as:

```js
person.address.setStreet('New street name');
```

## Collections

From previous examples, we already have a `Person` model. Now let's say, a `Person` has a collection of `Books`.

We can define the classes as follows:

```js
import { Types, createModel, createCollection } from 'tydel';


const Book = createModel({
  title: Types.string.isRequired
});

const Books = createCollection(Book);

const Person = createModel({
  name: Types.string.isRequired,
  books: Types.collection.of(Books)
});
```

When instantiating a `Person`, we can optionally pass books data too:

```js
const person = new Person({
  name: 'Bathilda Bagshot',
  books: [
    { title: 'A History of Magic' }
  ]
});

// `person` is an instance of Person
// `person.books` is an instance of Books
// `person.books.at(0)` is an instance of Book
```

You could now add more books to the list as:

```js
person.books.push(new Book({
  name: 'Hogwarts: A History'
}));
```
