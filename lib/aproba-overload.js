/**
 * Created by rhett on 2/22/16.
 */
'use strict';
var aproba = require('aproba');

var parentErrors = [
  'EMISSINGARG',
  'EUNKNOWNTYPE',
  'EINVALIDTYPE',
  'ETOOMANYARGS'
];

var validate = module.exports = function (schema, args, throwErr) {

  // Enable OR syntax
  if (/.+\|.+/.test(schema)) {  // example schema = 'O|OF|O*F'
    var t = schema.split(/\|(.+)/); // t = ['O', 'OF|O*F', '']

    // return recursive for schema = 'O' OR recursive for schema = 'OF|O*F' <= which has another recurse
    return validate(t[0], args, throwErr) || validate(t[1], args, throwErr);
    // Todo: problem with throwErr here; If true passed it may not reach second call. Rethink this combo
  }

  try {
    aproba(schema, args);
  } catch (err) {
    if (throwErr || parentErrors.indexOf(err.code) === -1) { // pass-through requested || Catch only known errors
      throw err;
    }

    // Doesn't meet schema
    return false;
  }

  return true; // no problems, success
};
