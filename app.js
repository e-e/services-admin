const path = require('path');
const express = require('express');
const app = express();
const db = require('./db');
const auth = require('./lib/auth');
const ServiceController = require('./models/service/ServiceController');

app.set('view engine', 'pug');
app.use('/static', express.static('./static'));
app.use('/services', ServiceController);
app.get('/', auth, (req, res) => {
  // res.render('index', { env: process.env.NODE_ENV || 'devlopment' });
  res.sendFile(path.join(__dirname, './views/index.html'));
});

module.exports = app;
