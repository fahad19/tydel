# createModel

> createModel(schema, methods)

Returns a [Model](./Model.md) class based on the schema and methods that are provided.

Can be accessed as:

```js
import { createModel } from 'tydel';
```

## schema

The schema object is a plain key-value pair object, where keys are the property/field names, and values are Type expressions:

```js
import { Types, createModel } from 'tydel';

const Person = createModel({
  name: Types.string,
  age: Types.number
});
```

## methods

Methods are passed in a plain object keyed by their names, and values being the functions that you want exposed from the Model instance:

```js
import { Types, createModel } from 'tydel';

const Person = createModel({
  firstName: Types.string,
  lastName: Types.string,
  age: Types.number
}, {
  setAge(age) {
    this.age = age;
  },

  getFullName() {
    return this.firstName + ' ' + this.lastName;
  }
});
```

Now from your instances you can access the methods as:

```js
const person = new Person({
  firstName: 'Harry',
  lastName: 'Potter',
  age: 18
});

const fullName = person.getFullName();

person.setAge(19);
```
