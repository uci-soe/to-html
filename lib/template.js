/**
 * Created by rhett on 2/17/16.
 */
'use strict';

//var path = require('path');
var fs = require('fs');

var error = require('if-err');
var q     = require('q');

//var request = require('request');
//var isUrl   = require('is-url');
var File    = require('./file');
var isPath  = require('./is-path');
var engines = require('./engines');


//var defaultEngine = '.swig';


/**
 * Template getter
 *
 * @param {String} name string name of template o fetch
 * @param {Function} [cb] callback
 * @return {q.Promise|null} return eventually
 */
var template = function getTemplate (name, cb) {
  var t = template._registry[name];
  error.ifNot(t, 'Template does not exist. Please see admin to add template.');

  return q(t.template ? t : template.prep(t))
    .then(res => res.template)
    .nodeify(cb);
};

/**
 * Template registry store
 *
 * key = registry name
 * value = File object of template
 *
 * @type {{File}}
 */
template._registry = {};

template.resetRegistry = function () {
  template._registry = {};
};

template.has = function (name) {
  return !!template._registry[name];
};

/**
 * Prepare/Compile template object
 *
 * Get contents if not already gotten and compile using the
 * templating language associated with the files extension
 *
 * @param {File} t template object to prepare
 * @param {function} [cb] Callback
 * @return {q.Promise|null} return eventually
 */
template.prep = function prepTemplate (t, cb) {
  // Check for engine, no point in running if no engine
  var eng = engines[t.extname];
  error.ifNot(eng, 'No engine available for extension ' + t.extname);

  // return promise from File.prototype.loadContents
  return t.loadContents()
    .then(contents => {

      // Compile contents and assign to the template property
      t.template = eng.compile(contents);
      return t;
    })
    .nodeify(cb);
};

/**
 * Add File object to registry
 *
 * @param {File} file File to add
 * @param {function} [cb] Callback
 * @return {q.Promise|null} Return eventually
 */
template.add = function addFile (file, cb) {
  error.ifNot(file, 'Must include file');
  error.ifNot(File.isVinyl(file), 'file must be vinyl');

  if (!file.loadContents) {
    file = File.fromVinyl(file);
  }

  template._registry[file.stem] = file;
  return template
    .prep(file)
    .nodeify(cb);
};

/**
 * Add template to registry by path
 *
 * @param {String|File} str path, url, template, or vinyl of template file
 * @param {Function} [cb] callback. Returns err and template file
 * @return {q.Promise|null} return eventually
 */
template.addPath = function addPath (str, cb) {
  var d = q.defer();
  fs.stat(str, (err, stat) => {
    if (err) {
      d.reject(err)
    } else if (!stat.isFile()) {
      d.reject(new Error('Path is not file'));
    } else {
      str = new File({
        path: str
      });

      d.resolve(template.add(str));
    }
  });

  return d.promise.nodeify(cb);
};


module.exports = template;
