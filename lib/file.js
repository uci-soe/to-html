/**
 * Created by rhett on 2/17/16.
 */
'use strict';

var fs = require('fs');
var File = require('vinyl');
var q = require('q');

File.prototype.loadContents = function (callback) {
  var d = q.defer();

  if (this.contents) {
    d.resolve(this.contents);
  } else {
    fs.readFile(this.path, (err, buf) => {
      if (err) {
        d.reject(err);
      } else {
        this.contents = buf;
        d.resolve(this);
      }
    });
  }

  return d.promise.nodeify(callback);
};

File.fromVinyl = function (vinyl) {
  return new File({
    cwd: vinyl.cwd,
    base: vinyl.base,
    path: vinyl.path,
    contents: vinyl.contents
  });
};

module.exports = File;
