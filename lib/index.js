'use strict';

var error  = require('if-err');
var extend = require('deep-extend');
var probe  = require('./aproba-overload');

var defaultOptions = {
  engine  : null,
  template: null,
  data    : null
};


/**
 * Factory Init
 *
 * @type {toHTML} the compiler for templates
 * @param {Object} t       templater. usually ./templater
 * @param {Object} options Object with default compile options
 * @return {toHtml} this new object
 */
var toHtml = module.exports = function (t, options) {
  error.ifNot(t, 'must provide template resolver');

  if (!(this instanceof toHtml)) {
    return new toHtml(t, options);
  }

  this.templater = t;
  this._compileOptions = extend({}, defaultOptions, options || {});

  return this;
};

toHtml.prototype.templater = null;
toHtml.prototype._compileOptions = {};

/**
 * Do compile
 *
 * @param {Object} options object with #template, #data, etc
 * @param {Function} [callback] optional callback function
 * @return {q.Promise|null} return eventually as callback or promise
 * @private
 */
toHtml.prototype._compile = function (options, callback) {
  // get template in question
  return this.templater(options.template)
  // render
    .then(t => t(options.data))
    // callback
    .nodeify(callback)
  ;
};


/**
 * Compile template
 *
 * @param {String|Object} template   Either template name or options object
 * @param {Object}        [data]     data for template rendering
 * @param {Object}        [options]  optional object for options
 * @param {Function}      [callback] optional callback, returns promise of null
 *
 * @return {q.Promise|null} promise if no callback, null if returned.
 */
toHtml.prototype.compile = function (template, data, options, callback) {
  var args = arguments;
  var opts = extend({}, this._compileOptions);


  if (probe('O|OF', args)) {            // Options with optional call
    extend(opts, args[0]);
    callback = args[1];
  } else if (probe('SO|SOF', args)) {   // template name and data, optional call
    opts.template = args[0];
    opts.data     = args[1];
    callback      = args[2];
  } else if (probe('SOO|SOOF', args)) { // template name and data, additional template options, optional call
    extend(opts, args[2]);
    opts.template = args[0];
    opts.data     = args[1];
    callback      = args[3];
  } else {
    throw new Error('Invalid Arguments: must provide template and data or options object');
  }


  return this._compile(opts, callback);
};
