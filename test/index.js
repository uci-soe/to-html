'use strict';

var path = require('path');
var assert = require('chai').assert;
var toHtmlFac = require('../lib');

var templater = require('../lib/template');

describe('to-html', function () {
  before(function (done) {
    templater.addPath(path.join(__dirname, 'files', 'test.swig'), done);
  });

  var toHtml;
  beforeEach(function () {
    toHtml = toHtmlFac(templater, {testing: 123});
  });

  it('should store the provided templater', function () {
    assert.strictEqual(templater, toHtml.templater);
  });
  it('should store default options', function () {
    assert.isNotNull(toHtml._compileOptions);
    assert.equal(123, toHtml._compileOptions.testing);
  });
  it('should compile to a string', function (done) {
    toHtml.compile({
      template: 'test',
      data: {
        name: 'Jimmy'
      }
    }, function (err, data) {
      assert.ifError(err);
      assert(data);
      assert.isString(data);
      done();
    });
  });

  describe('compile options', function () {

    beforeEach(function () {
      toHtml._compile = function (options, callback) {
        return callback(options);
      };
    });

    it('should accept options with optional callback', function () {
      toHtml.compile({
        template: 'test',
        date: {}
      }, function (options) {
        assert(options.template);
      });
      toHtml.compile({}, function (options) {
        assert.isNull(options.template);
        assert.equal(123, options.testing);
      });
    });
    it('should accept string and data with optional callback', function () {
      toHtml.compile('test', {}, function (options) {
        assert.equal('test', options.template);
        assert.equal(123, options.testing);
      });
    });
    it('should accept string and data and options with optional callback', function () {});
    it('should error with non-accepted arguments', function () {
      assert.throws(function () {
        toHtml.compile('test');
      }, /arguments/i);
      assert.throws(function () {
        toHtml.compile(123);
      }, /arguments/i);
      assert.throws(function () {
        toHtml.compile(function(){});
      }, /arguments/i);
      assert.throws(function () {
        toHtml.compile('string', {}, 123, function(){});
      }, /arguments/i);
    });
    it('should error with no arguments', function () {
      assert.throws(function () {
        toHtml.compile();
      }, /arguments/i);
    });
  });
});
