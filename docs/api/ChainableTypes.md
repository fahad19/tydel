# ChainableTypes

List of chainable functions that are made available in `Types` as expressions.

Can be accesssed as follows:

```js
import { ChainableTypes } from 'tydel';
```

You are very unlikely to ever use them directly, since they are used via `Types`.

Usage examples show you how to use them in Model classes:

### isRequired

> isRequired

```js
import { Types, createModel } from 'tydel';

const Todo = createModel({
  title: Types.string.isRequired
});
```

### defaults

> defaults(defaultValue)

```js
import { Types, createModel } from 'tydel';

const Todo = createModel({
  title: Types.string.defaults('Default title here...')
});
```
