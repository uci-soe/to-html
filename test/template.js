'use strict';

var assert   = require('chai').assert;
var path     = require('path');
var Template = require('../lib/template');
var File     = require('../lib/file');

describe('Template', function () {

  var testFile;
  beforeEach(function () {
    Template.resetRegistry();
    testFile = new File({
      path: path.join(__dirname, 'files', 'test.swig')
    });
  });

  describe('Template', function () {
    it('should error if template name not registered', function () {
      assert.throws(function () {
        Template('doesNotExist');
      }, /not.*exist/i);
    });
  });
  describe('#add', function () {
    it('should error when file given is missing or not a vinyl-like object', function () {
      assert.throws(function () {
        Template.add();
      }, /file/i);
      assert.throws(function () {
        Template.add(true);
      }, /vinyl/i);
    });
    it('should add filename to registry', function () {
      assert(!Template.has('test'), 'testfile somehow got into registry early(??)');

      Template.add(testFile);

      assert(Template.has('test'), 'testfile failed to get into the registry');
    });
    it('should prepare the file for use', function (done) {
      Template.add(testFile, function (err, file) {
        assert.ifError(err);
        assert(typeof file.template === 'function', 'File.template is not populated or is not a function');
        done();
      });
    });
    it('should make a File from Vinyl (just in case)', function (done) {
      testFile.loadContents = null;
      Template.add(testFile, function (err, file) {
        assert.ifError(err);
        assert(File.isFile(file), 'file was not casted to type File');
        done();
      });
    });
  });
  describe('#addPath', function () {
    it('should error if file doesn\'t exist', function (done) {
      Template.addPath('/does/not/exist', function (err) {
        assert.isNotNull(err);
        assert.match(err, /ENOENT/i);
        done();
      });
    });
    it('should error if path is not a file', function (done) {
      Template.addPath(__dirname, function (err) {
        assert.isNotNull(err);
        assert.match(err, /not.*file/i);
        done();
      });
    });
    it('should file to registry', function (done) {
      assert(!Template.has('test'), 'testfile somehow got into registry early(??)');
      Template.add(testFile, function (err) {
        assert.ifError(err);
        assert(Template.has('test'), 'testfile failed to get into the registry');
        done();
      });
    });
  });
  describe('#resetRegistry', function () {

    it('reset a full registry to empty', function () {
      var templateName = 'temp';

      //noinspection BadExpressionStatementJS
      Template._registry[templateName] = {};
      assert(Template.has(templateName), 'temporary template is not in registry');

      Template.resetRegistry();
      assert(!Template.has(templateName), 'temporary template was not removed from registry');
    });

  });
  describe('#prep', function () {
    it('should throw error if no engine with which to prep', function () {
      assert.throws(function () {
        testFile.extname = '.foo';
        Template.prep(testFile);
      }, /engine/i);
    });
    it('should eventually return a File', function (done) {
      Template.prep(testFile, function (err, t) {
        assert.ifError(err);
        assert(File.isFile(t), 'not recognized as File object');
        done();
      });
    });
    it('should store the prepared template at #template', function (done) {
      Template.prep(testFile, function (err, t) {
        assert.ifError(err);
        assert(typeof t.template === 'function', 'template not saved in #template');
        done();
      });
    });
    it('should load contents of File into #contents', function (done) {
      Template.prep(testFile, function (err, t) {
        assert.ifError(err);
        assert(t.contents, 'no template contents stored');
        done();
      });
    });
  });

});
