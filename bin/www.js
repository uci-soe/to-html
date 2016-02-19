#!/usr/bin/env node
'use strict';

var restify = require('restify');
var error = require('if-err');
var extend = require('deep-extend');
var template = require('../lib/template');
var templateLoader = require('../lib/load-templates');
var app = require('../lib');


app.init(template);


// Get untrackable configurations.
try {
  extend(process.env, require('../config.json'));
} catch (err) {
  if (!err.message || err.code !== 'MODULE_NOT_FOUND') {
    throw err;
  }
}


var serviceName = process.env.npm_package_name || require('../package.json').name;
var server = restify.createServer({
  name: serviceName,
  version: '1.0.0'
});


server.post('/', restify.bodyParser(), app.index);

templateLoader('../templates', template, function (err) {
  error.if(err);

  server.listen(process.env.npm_package_config_port || 15000);
});
