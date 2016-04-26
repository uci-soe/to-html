#!/usr/bin/env node
'use strict';

var restify        = require('restify');
var error          = require('if-err');
var extend         = require('deep-extend');
var template       = require('../lib/template');
var templateLoader = require('../lib/load-templates');
var app            = require('../lib')(template);

var pkg = require('../package.json');


// Get untrackable configurations.
try {
  extend(process.env, require('../config.json')); // eslint-disable-line global-require
} catch (err) {
  if (!err.message || err.code !== 'MODULE_NOT_FOUND') {
    throw err;
  }
}


var serviceName = process.env.NAME || pkg.name;
var server      = restify.createServer({
  name:    serviceName,
  version: '1.0.0'
});


server.post('/test2', restify.bodyParser(), function (req, res) {
  res.send(req.body);
});
server.post('/:template', restify.bodyParser(), function (req, res, next) {
  //console.log(req.params);
  var templateName = req.params.template;
  var bodyData     = req.body || req.params.data;
  var err      = null;

  if (!templateName) {
    err = new restify.errors.BadRequestError('Must request a specific template');
  } else if (!bodyData) {
    err = new restify.errors.BadRequestError('Must provide data for template');
  }
  next.ifError(err);

  app.compile(templateName, bodyData, function (err2, data) {
    next.ifError(err2);
    res.send(data);
    next();
  });
});
server.get('/', function (req, res, next) {
  res.send(template.list());
  next();
});

templateLoader('../templates', template, function (err) {
  error.if(err);

  server.listen(process.env.PORT || 15000, function () {
    /*eslint-disable no-console */

    console.log('%s server started at %s', server.name, server.url);
    console.log(template.list());

    /*eslint-denable no-console */
  });
});
