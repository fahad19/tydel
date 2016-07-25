# Installation

## npm

With [npm](https://npmjs.com):

```
$ npm install --save tydel
```

Now you can require it in your modules.

ES6 / [Babel](https://babeljs.io):

```js
import tydel from 'tydel';
```

ES5:

```js
const tydel = require('tydel');
```

## Bower

With [bower](http://bower.io):

```
$ bower install --save tydel
```

Now in your HTML file:

```html
<!DOCTYPE html>
<html>
  <body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.13.1/lodash.min.js"></script>
    <script src="bower_components/tydel/dist/tydel.min.js"></script>
  </body>
</html>
```

The library would be available in `window.Tydel`.
