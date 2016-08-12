# tydel
<!--{h1:.massive-header.-with-tagline}-->

> Typed models and collections

[![Build Status](https://img.shields.io/travis/fahad19/tydel/master.svg)](http://travis-ci.org/fahad19/tydel) [![npm](https://img.shields.io/npm/v/tydel.svg)](https://www.npmjs.com/package/tydel) [![star](https://img.shields.io/github/stars/fahad19/tydel.svg?style=social&label=Star)](https://github.com/fahad19/tydel)

For documentation, visit [http://tydel.js.org](http://tydel.js.org).

## Overview

Tydel is a small library aimed at giving you a solid and strict **foundation** for your **data structure** needs in JavaScript.

Install it via [npm](https://npmjs.com):

```sh
$ npm install --save tydel
```

Basic usage example:

```js
import { Types, createModel } from 'tydel';

const Todo = createModel({
  title: Types.string.isRequired,
  description: Types.string
});

const todo = new Todo({
  title: 'My first ToDo',
  description: 'notes here...'
});

console.log(todo.title); // `My first ToDo`
```

Or load it via [npmcdn](https://npmcdn.com):

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.15.0/lodash.min.js"></script>
<script src="https://npmcdn.com/tydel@latest/dist/tydel.min.js"></script>

<script>
  // window.Tydel
</script>
```

## Terminologies

The three main **terminologies** you would come across are:

* [Types](./docs/getting-started/types.md): Strict type **expressions** for Model's values,
* [Models](./docs/getting-started/models.md): for **representing** your data, and
* [Collections](./docs/getting-started/collections.md): for containing Models like an **array**.

## Guides

There is a [quickstart](./docs/intro/quickstart.md) guide which would get you up an running in no time. To understand the concepts well, read the [getting started](./docs/getting-started/types.md) guides.

[Install](./docs/intro/installation.md) it, and enjoy!

## Integrations & Resources

* [tydel-react](https://github.com/fahad19/tydel-react): React.js bindings
* [tydel-logger](https://github.com/fahad19/tydel-logger): Prints state changes to console

## Thanks

These beautifully made open source projects have directly or indirectly played an influential role for Tydel, and a huge amount of thanks go to their authors and contributors:

* [Backbone.js](http://backbonejs.org/)
* [Redux](https://redux.js.org/)
* [MobX](https://mobxjs.github.io/mobx/)

## License

MIT © [Fahad Ibnay Heylaal](http://fahad19.com)
