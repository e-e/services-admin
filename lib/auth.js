const basicAuth = require('basic-auth');
const config = require('../config');

console.log('config', config);
const auth = (req, res, next) => {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  }

  const user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  }

  if (user.name === config.admin.un && user.pass === config.admin.pw) {
    return next();
  } else {
    return unauthorized(res);
  }
};

module.exports = auth;
