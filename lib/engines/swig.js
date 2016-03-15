/**
 * Created by rhett on 2/17/16.
 */
'use strict';

var swig = require('swig');

module.exports = {
  /**
   * Compile into function for later rendering
   *
   * @param {String|Buffer} str Template to compile
   * @param {Object} [opts] Swig options object, see http://paularmstrong.github.io/swig/docs/api/#SwigOpts
   * @return {Function} rendering function
   */
  compile: function (str, opts) {
    return swig.compile(str.toString(), opts);
  }
};


swig.setFilter('lPadDigits', function (input, num) {
  while (('' + input).length < num) {
    input = '0' + input;
  }
  return input;
});
swig.setFilter('hasProps', function (input) {
  return !!Object.getOwnPropertyNames(input)
    .filter(function (key) {
      return !!input[key];
    })
    .length;
});
swig.setFilter('range', function (input) {
  return input.join ? input.join('-') : input;
});
swig.setFilter('round', function (input, num) {
  return (+input).toFixed(num || 2);
});
swig.setFilter('percent', function (input, num) {
  num = typeof num === 'number' ? num : 2;
  return (input * 100).toFixed(num);
});
swig.setFilter('floor', Math.floor);
