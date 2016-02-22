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
