'use strict';

var assert = require('assert');
var File   = require('../lib/file');
var Vinyl  = require('vinyl');
var path   = require('path');

describe('File', function () {
  var testFile;
  var testVinyl;

  beforeEach(function () {
    testFile  = new File({
      path: path.join(__dirname, 'files', 'test.md')
    });
    testVinyl = new Vinyl({
      path: path.join(__dirname, 'files', 'test.md')
    });
  });

  it('should pass vinyl\'s #isVinyl test', function () {
    assert(Vinyl.isVinyl(testFile), 'File failed to meed Vinyls internal Vinyl duck-typing.');
  });
  it('should make a file from a vinyl', function () {
    assert(File.fromVinyl(testVinyl).loadContents, 'failed to convert vinyl and pass duck typing');
  });

  it('should recognize Files via duck typing', function(){
    assert(File.isFile(testFile), 'failed to recognize test File');
    //assert(!File.isFile(testVinyl), 'erroneously recognized test Vinyl');
  });

  describe('#loadContents', function () {
    it('should resolve with contents if already present', function (done) {
      var initContents  = new Buffer('some text');
      testFile.contents = initContents;

      testFile.loadContents(function (err, contents) {
        assert.ifError(err);
        assert.strictEqual(initContents.toString(), contents.toString());
        done();
      });
    });

    it('should resolve with File', function (done) {
      testFile.loadContents(function (err, template) {
        assert.ifError(err);
        assert(Vinyl.isVinyl(template), 'failed to duck type as vinyl');
        assert(template.loadContents, 'Failed to duck type as File');
        done();
      });
    });

    it('should resolve contents of file', function (done) {
      testFile.loadContents(function (err, template) {
        assert.ifError(err);
        assert(/test document/i.test(template.contents.toString()), 'not retrieving contents: ' + template.contents.toString());
        done();
      });
    });
  });
});
