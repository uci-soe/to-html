/**
 * Created by rhett on 2/17/16.
 */
'use strict';

/**
 * Holy god this is a confusing regex. someone kill me next time I try this
 *
 * Here is my best explanation: (view tests for examples of what I am trying to solve)
 *
 * 1. `/^/` and `/$/` are beginning and end
 * 2. `/(file:\/{2,3}(\w\|)?)?/` is for optional file url scheme
 *   - `file://dir/file` is `/dir/file` in linux
 *   - `file:///d|dir/file` is `d:\\dir\file` in windows
 * 3. `/(\w:|\.{1,2})?/` to catch prefixes in windows or relative prefixes in linux
 *   - `c:\\dir\file` in windows
 *   - `.` or `..` are relative for both linux and windows
 * 4. `/[\w\d\s\-._]/` is a alphanumeric phrase with/without hyphens, dots, spaces, and/or underscores
 * 5. `/[\\/]/` is the windows or linux separator
 * 6. `/([\\/][\w\d\s\-._]*)/` allows for repeating subdirectories or files.
 *
 * This is possibly the longest (and maybe the stupidest) regexp I have ever written.
 * There has to be a better way.
 *
 * @param {String} str String to be tested as path
 * @return {boolean} is path or not path
 */

module.exports = function isPath (str) {
  return /^(file:\/{2,3}(\w\|)?)?(\w:|\.{1,2})?[\w\d\s\-._]*([\\/][\w\d\s\-._]*)*$/i.test(str);
};
