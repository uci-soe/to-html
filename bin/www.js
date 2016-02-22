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


server.post('/', restify.bodyParser(), function (req, res, next) {
  app.compile('test', {who: 'Rhett'}, function(err, data){
    next.ifError(err);
    res.send(data);
    next();
  });
});

templateLoader('../templates', template, function (err) {
  error.if(err);

  server.listen(process.env.npm_package_config_port || 15000, function () {
    console.log('Server Started.');
  });
});
