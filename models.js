
var Mongoose = require('mongoose');


var UserSchema = new Mongoose.Schema({
  "Name": String,
  "Password": String,
});

exports.User = Mongoose.model('User', UserSchema);
