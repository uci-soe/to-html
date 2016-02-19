# to-html [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Microservice to convert data and template into html

## Installation

There are two ways to install: as a submodule or a microserver.

#### 1. As submodule
```bash
npm install --save to-html
```

#### 2. As microservice
```bash
git clone http://github.com/uci-soe/to-html
cd to-html
npm start
```

#### Running Microservice with PM2

PM2 is recommended. Here is an example `pm2.json` 

```json
{
  "name"        : "to-html",
  "script"      : "bin/www.js",
  "args"        : [],
  "watch"       : true,
  "node_args"   : "",
  "cwd"         : "/root/path/to/to-html",
  "env": {
    "NODE_ENV": "production",
    "PORT": "6000",
    "NODE_DEBUG": ""
  }
}
```

More `pm2.json` documentation available [here](http://pm2.keymetrics.io/docs/usage/application-declaration/)

## Usage

```javascript
/* Add usage for submodule */
```

```javascript
/* Add usage for microservice */
```


## License

BSD-3-Clause - [LICENSE](LICENSE)


[npm-image]: https://badge.fury.io/js/to-html.svg
[npm-url]: https://npmjs.org/package/to-html
[travis-image]: https://travis-ci.org/uci-soe/to-html.svg?branch=master
[travis-url]: https://travis-ci.org/uci-soe/to-html
[daviddm-image]: https://david-dm.org/uci-soe/to-html.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/uci-soe/to-html
[coveralls-image]: https://coveralls.io/repos/uci-soe/to-html/badge.svg
[coveralls-url]: https://coveralls.io/r/uci-soe/to-html
