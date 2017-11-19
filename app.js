var express = require('express');
var app = express();
var db = require('./db');

var ServiceController = require('./service/ServiceController');
app.use('/services', ServiceController);

module.exports = app;
