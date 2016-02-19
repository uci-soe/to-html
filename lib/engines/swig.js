/**
 * Created by rhett on 2/17/16.
 */
'use strict';

var swig = require('swig');

module.exports = {
  compile: function(str){
    return swig.render.bind(swig, str.toString());
  }
};
