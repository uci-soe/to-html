/**
 * Created by rhett on 2/17/16.
 */
'use strict';

var path = require('path');
var fs   = require('fs');

var error = require('if-err');
var q     = require('q');

//var request = require('request');
//var isUrl   = require('is-url');
var File   = require('./file');
var isPath = require('./is-path');
var engines = require('./engines');


var defaultEngine = '.swig';


/**
 * Template getter
 *
 * @param {String} name
 * @param {Function} [cb]
 * @return {q.Promise|null}
 */
var template = function getTemplate (name, cb) {
  var t = template._registry[name];
  error.ifNot(t, 'Template does not exist. Please see admin to add template.');

  return q(t || template.prep(t))
    .then(t => t.template)
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

/**
 * Prepare/Compile template object
 *
 * Get contents if not already gotten and compile using the
 * templating language associated with the files extension
 *
 * @param {File} t template object to prepare
 * @param {function} [cb] Callback
 * @return {q.Promise|null}
 */
template.prep = function prepTemplate (t, cb) {
  // Check for engine, no point in running if no engine
  var eng = engines[t.extname];
  error.ifNot(eng, 'No engine available for extension ' + t.extname);

  // return promise from File.prototype.loadContents
  return t.loadContents()
    .then(function (contents) {
      // Compile contents and assign to the template property
      t.template = eng.compile(contents.toString());
      return t;
    })
    .nodeify(cb);
};

/**
 * Add File object to registry
 *
 * @param {File} file File to add
 * @param {function} [cb]
 * @return {q.Promise|null}
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
 * @return {q.Promise|null}
 */
template.addPath = function addPath (str, cb) {
  error.ifNot(isPath(str), 'Not valid path format. given: ' + str);

  var d = q.defer();

  fs.stat(str, (err, stat) => {
    error.if(err);
    error.ifNot(stat.isFile(), 'Path is not file');

    str = new File({
      path: str
    });

    d.resolve(template.add(str));
  });

  return d.promise.nodeify(cb);
};


module.exports = template;


//var templateDir = path.join(__dirname, '..', 'templates');
//template
//  .add(
//    new File({
//      path: path.join(templateDir, 'swig', 'allSchools.swig')
//    })
//  )
//  .fail(function (err) {
//    throw err;
//  })
//  .done(function (file) {
//    console.log(file);
//    console.log(template._registry)
//  })
//;

//template
//  .addPath(path.join(templateDir, 'swig', 'allSchools.swig'))
//  .then(function (file) {
//    console.log(file);
//    return file;
//  })
//  .fail(function (err) {
//    throw err;
//  })
//  .done(function (file) {
//    console.log(file);
//  })
//;


//new File({
//  path: path.join(templateDir, 'swig', 'allSchools.swig')
//});
//new File({
//  path: path.join(templateDir, 'swig', 'courseByInst.swig')
//});
//new File({
//  path: path.join(templateDir, 'swig', 'teacherMultiQuarter.swig')
//});
