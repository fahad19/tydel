# Types

Usage examples below show you how to pass them in Model classes.

### string

```js
import { Types, createModel } from 'tydel';

const Todo = createModel({
  title: Types.string
});
```

### bool

For boolean values:

```js
import { Types, createModel } from 'tydel';

const Todo = createModel({
  completed: Types.bool
});
```

### number

```js
import { Types, createModel } from 'tydel';

const Person = createModel({
  age: Types.number
});
```

### array

Even though this type exists in the API, you are highly advised to use Collection for any array-like values.

```js
import { Types, createModel } from 'tydel';

const Author = createModel({
  books: Types.array
});
```

### object

Even though this type exists in the API, you are highly advised to use Model for any object-like values.

```js
import { Types, createModel } from 'tydel';

const Person = createModel({
  address: Types.object
});
```

And for defining schema of nested object, you can use `object.of`:

```js
const Person = createModel({
  address: Types.object.of({
    street: Types.string,
    city: Types.string,
    postalCode: Types.number,
    country: Types.string
  });
});
```

### enum

If you want the value to be one of the pre-defined list of values:

```js
import { Types, createModel } from 'tydel';

const Book = createModel({
  category: Types.enum([
    'history',
    'fiction',
    'romance'
  ])
});
```

And if you want the enum to be of specific types, you can use `enum.of`:

```js
const Book = createModel({
  category: Types.enum.of([
    Types.string,
    Types.number
  ])
});
```

### any

If the value can be of any type. You are advised not to use this:

```js
import { Types, createModel } from 'tydel';

const Person = createModel({
  bio: Types.any
});
```

### model

Models can embed other models too:

```js
import { Types, createModel } from 'tydel';

const Person = createModel({
  address: Types.model
});
```

If you want to be more strict about which Model class can be embedded, use `model.of`:

```js
const Address = createModel({
  street: Types.string,
  city: Types.string
});

const Person = createModel({
  address: Types.model.of(Address)
})
```

### collection

Collections can also be embedded in models:

```js
import { Types, createModel } from 'tydel';

const Author = createModel({
  books: Types.collection
});
```

If you want to be more strict about which Collection class can be embedded, use `collection.of`:

```js
const Book = createModel({
  title: Types.string
});

const Books = createCollection(Book);

const Author = createModel({
  books: Types.collection.of(Books)
});
```
