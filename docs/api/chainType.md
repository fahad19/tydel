# chainType

> chainType(fn)

Can be accessed as:

```js
import { chainType } from 'tydel';
```

Used for wrapping around primary type functions. For example, if you wish to create a new primary type:

```js
import { Types, chainType, TypeError } from 'tydel';

Types.myNewPrimaryType = chainType(function (value) {
  if (valueIsOk(value)) {
    return value;
  }

  throw new TypeError('something wrong with the value...');
});
```

Wrapping it in `chainType()` makes sure that your new type funciton can be chained with `.isRequired` and `.defaults()` everywhere else.
