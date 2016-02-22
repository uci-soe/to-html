/**
 * Created by rhett on 2/22/16.
 */
'use strict';
var aproba = require('aproba');

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
    if (!throwErr &&      // pass-through requested
      [
        'EMISSINGARG',
        'EUNKNOWNTYPE',
        'EINVALIDTYPE',
        'ETOOMANYARGS'
      ].indexOf(err.code) // Catch only known errors
    ) {
      return false;       // Doesn't meet schema
    } else {
      throw err;          // pass-through or other, unexpected error
    }
  }

  return true; // no problems, success
};
