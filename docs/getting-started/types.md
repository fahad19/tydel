# Types

One of the main features of tydel is that it is strictly based on **typed values**.

A list of type **expressions** are already shipped with the package and you can import them as follows:

```js
import { Types } from 'tydel';
```

Some of the types include:

* `Types.string`
* `Types.number`
* `Types.enum`
* ...see [API Reference](../api/Types.md) for more.

## Primary types

If you want to check the type of a value that you expect to be a string:

```js
const checkIfString = Types.string;
```

Now the `checkIfString` function would return a string if a correct valid string was passed to it, otherwise it would throw a new `TypeError`.

```js
const str = checkIfString('Hello World'); // returns `Hello World`

const foo = checkIfString([1, 2, 3]); // throws TypeError
```

## Chaining

Type expressions can also be chained:

```js
const checkIfString = Types.string.isRequired;

checkIfString('hello world'); // returns `hello world`

checkIfString(); // throws TypeError: value is undefined
```

Available chained expressions:

* `isRequired`
* `defaults(defaultValue)`
