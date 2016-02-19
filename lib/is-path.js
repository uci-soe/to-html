/**
 * Created by rhett on 2/17/16.
 */
'use strict';

var path = require('path');

module.exports = function isPath (str) {
  return RegExp('^([A-Z]:|\.{1,2})?'+path.sep).test(str);
};
