
var Mongoose = require('mongoose');


var UserSchema = new Mongoose.Schema({
  "Name": String,
  "password": String
});

exports.User = Mongoose.model('User', UserSchema);
