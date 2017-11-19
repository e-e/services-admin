const app = require('./app');
const config = require('./config');
const server = app.listen(config.port, function() {
  process.env.NODE_ENV !== 'production' &&
    console.log('Express server listening on port ' + config.port);
});
