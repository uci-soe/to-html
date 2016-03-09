'use strict';

var assert = require('assert');
var isPath = require('../lib/is-path');

describe('is-path', function () {
  describe('*nix Paths', function () {
    it('should accept relative paths', function () {
      assert(isPath('../hello/world'), 'failed with parent dir');
      assert(isPath('hello/world'), 'failed with self implicit');
      assert(isPath('./hello/world'), 'failed with self explicit');
    });
    it('should accept absolute paths', function () {
      assert(isPath('/hello/world'));
    });
    it('should reject HTML', function () {
      assert(!isPath('<h1>Hello World</h1>'));
    });
    it('should accept file URI scheme', function () {
      assert(isPath('file://hello/world'));
    });
  });
  describe('Windows Paths', function () {
    it('should accept relative paths', function () {
      assert(isPath('..\\hello\\world'), 'failed with parent dir');
      assert(isPath('hello\\world'), 'failed with self implicit');
      assert(isPath('.\\hello\\world'), 'failed with self explicit');
    });
    it('should accept absolute paths', function () {
      assert(isPath('\\hello\\world'));
    });
    it('should reject HTML', function () {
      assert(!isPath('<h1>Hello World</h1>'));
    });
    it('should accept file URI scheme', function () {
      assert(isPath('file:///c|hello/world'));
    });
  });
});
