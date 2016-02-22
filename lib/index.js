'use strict';
var error  = require('if-err');
var q      = require('q');
var extend = require('deep-extend');
var probe  = require('./aproba-overload');

var template;

var toHTML = {
  _template      : null,
  init           : function (t) {
    toHTML._template = template = t;
  },
  _compileOptions: {
    engine  : null,
    template: null,
    data    : null
  },

  /**
   * Do compile
   *
   * @param {Object} options object with #template, #data, etc
   * @param {Function} [callback] optional callback function
   * @return {q.Promise|null}
   * @private
   */
  _compile       : function (options, callback) {
    var d = q.defer();

    // get templater or error
    var templater = toHTML.template();

    // get template in question
    templater(options.template)
      .then(d => {console.log(d); return d})

      // render
      .then(t => t(options.data))

      // output
      .fail(err => d.reject(err))
      .done(out => d.resolve(out))
    ;

    return d.promise.nodeify(callback);
  },

  /**
   * Template getter
   *
   * @returns {Function}
   * @throws Error
   */
  template: function () {
    error.ifNot(toHTML._template, 'Templater is not loaded.');
    return toHTML._template;
  },

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
  compile: function (template, data, options, callback) {
    console.log(arguments);
    var args = arguments;
    var opts = extend({}, toHTML._compileOptions);


    if (probe('O|OF', args)) {            // Options with optional call
      console.log('O|OF');
      extend(opts, args[0]);
      callback = args[1];
    } else if (probe('SO|SOF', args)) {   // template name and data, optional call
      console.log('SO|SOF');
      opts.template = args[0];
      opts.data     = args[1];
      callback      = args[2];
    } else if (probe('SOO|SOOF', args)) { // template name and data, additional template options, optional call
      console.log('SOO|SOOF');
      extend(opts, args[2]);
      opts.template = args[0];
      opts.data     = args[1];
      callback      = args[3];
    } else {
      throw new Error('Invalid Arguments: must provide template and data or options object');
    }


    return toHTML._compile(opts, callback);
  }
};


module.exports = toHTML;
