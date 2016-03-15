'use strict';

var assert = require('assert');
var probe  = require('../lib/aproba-overload');

describe('Aproba Overload', function () {
  it('should accept OR(|) syntax', function () {
    assert(probe('SS|SSN', ['s', 's', 0]));
  });
  it('should return true if success', function () {
    assert(probe('SS', ['s', 's']));
  });
  it('should return false if failure', function () {
    assert(!probe('SSN', ['s', 's']));
  });
  it('should throw error on request', function () {
    assert.throws(function () {
      assert(probe('SSN', ['s', 's'], true));
    });
  });
});
