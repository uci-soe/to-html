/**
 * Created by rhett on 2/18/16.
 */
'use strict';

var path = require('path');

//var File = require('./file');
var vfs = require('vinyl-fs');
var map = require('map-stream');
var q = require('q');

module.exports = function (dir, reg, cb) {
  var d = q.defer();
  var stream = vfs.src(path.join(dir, '**/*.*'))
    .pipe(map(function (file, next) {
      //console.log(file.path)
      reg.add(file);
      next(null, file);
    }))
  ;

  stream.on('end', function () {
    d.resolve();
  });
  stream.on('error', function (err) {
    d.reject(err);
  });

  return d.promise.nodeify(cb);
};
