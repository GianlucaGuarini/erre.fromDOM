<img alt="erre.js" src="https://cdn.rawgit.com/GianlucaGuarini/erre/master/erre-logo.svg" width="50%"/>

# erre.fromDOM

[erre](https://github.com/GianlucaGuarini/erre) erre plugin to stream DOM events

[![Build Status][travis-image]][travis-url]

[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]

## Installation

```sh
npm i erre.fromdom -S
```

## Usage

```js
import fromDOM from 'erre.fromdom'
import erre from 'erre'

erre.install('fromDOM', fromDOM)

const resizes = erre.fromDOM(window, 'resize orientationchange', { passive: true })
const clicks = erre.fromDOM(document.body, 'click')

clicks.on.value(e => console.log(e))
resizes.on.value(e => console.log(e))
```

[travis-image]: https://img.shields.io/travis/GianlucaGuarini/erre.fromDOM.svg?style=flat-square
[travis-url]: https://travis-ci.org/GianlucaGuarini/erre.fromDOM
[license-image]: http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]: LICENSE
[npm-version-image]: http://img.shields.io/npm/v/erre.fromdom.svg?style=flat-square
[npm-downloads-image]: http://img.shields.io/npm/dm/erre.fromdom.svg?style=flat-square
[npm-url]: https://npmjs.org/package/erre.fromdom

## API

### fromDOM

Create an erre stream from DOM events

**Parameters**

-   `els` **([HTMLElement](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) \| [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) \| [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array))** DOM node/s where the listeners will be bound
-   `eventsList` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** list of events we want to stream space separated
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** event options (capture, once and passive)

Returns **Generator** [erre stream generator](https://github.com/GianlucaGuarini/erre#stream)
