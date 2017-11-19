var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
mongoose.model('Service', UserSchema);

module.exports = mongoose.model('Service');
