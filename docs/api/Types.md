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

### date

```js
import { Types, createModel } from 'tydel';

const Person = createModel({
  birthday: Types.date
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

### uuid

If the value is expected to be an UUID:

```js
import { Types, createModel } from 'tydel';

const Book = createModel({
  id: Types.uuid
});
```

Example UUID value: `27961a0e-f4e8-4eb3-bf95-c5203e1d87b9`.

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
