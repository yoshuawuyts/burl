# burl
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]

Compute `hal-json:_links` `previous` and `next` values. Useful when urls need
to be processed before being ready to use.

## Installation
```bash
npm install burl
```

## Usage
```js
var burl = require('burl');

var links = burl({
  next: function(val) {
    return 'http://mysite.com/api?from=' + val;
  },
  previous: function(val) {
    return 'http://mysite.com/api?until=' + val;
  },
  normalize: function(val) {
    return val.splice(13)[1];
  }
});

links.set({
  previous: 'until=12345677',
  next: 'from=12345677'
});

links.get();
// => {
//   previous: 'http://mysite.com/api?until=12345677',
//   next: 'http://mysite.com/api?from=12345677'
// }
```

## API
#### var links = burl()
Create a new `burl` instance. Takes a single option with optional
`previous`, `next` and `normalize` functions. The functions must return their
containing value.
```js
var burl = require('burl');

var links = burl({
  next: function(val) {
    return 'http://mysite.com/api?from=' + val;
  },
  previous: function(val) {
    return 'http://mysite.com/api?until=' + val;
  },
  normalize: function(val) {
    return val.splice(13)[1];
  }
});
```

#### .set()
Save links to burl. Gets passed through the `normalize` function before
performing a comparison to keep the lowest value for `previous` and the heighest
value for `next`. Uses [`linkstash`][linkstash] under the hood.
```js
links.set({
  previous: 'until=12345677',
  next: 'from=12345677'
});
```

#### .get()
Get the composed urls for `previous` and `next` back in an object.
```js
links.get();
// => {
//   previous: 'http://mysite.com/api?until=12345677',
//   next: 'http://mysite.com/api?from=12345677'
// }
```

## See also
- [linkstash][linkstash]

## License
[MIT](https://tldrlegal.com/license/mit-license)

[npm-image]: https://img.shields.io/npm/v/burl.svg?style=flat-square
[npm-url]: https://npmjs.org/package/burl
[travis-image]: https://img.shields.io/travis/yoshuawuyts/burl.svg?style=flat-square
[travis-url]: https://travis-ci.org/yoshuawuyts/burl
[coveralls-image]: https://img.shields.io/coveralls/yoshuawuyts/burl.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/yoshuawuyts/burl?branch=master
[downloads-image]: http://img.shields.io/npm/dm/burl.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/burl

[linkstash]: http://github.com/yoshuawuyts/linkstash
