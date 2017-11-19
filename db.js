const config = require('./config');
var mongoose = require('mongoose');

mongoose.connect(
  `mongodb://${config.mongodb.un}:${config.mongodb.pw}@${config.mongodb.uri}`,
  { useMongoClient: true }
);
