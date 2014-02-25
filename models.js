
var Mongoose = require('mongoose');


var UserSchema = new Mongoose.Schema({
  "userID": Number,
  "Name": String,
  "Email": String,
  "password": String,
});

var PhotoSchema = new Mongoose.Schema({
  "userID": Number,
  "title": String,
  "image": String,
  "summary": String,
  "date": Date
});

exports.User = Mongoose.model('User', UserSchema);
exports.Photo = Mongoose.model('Photo', PhotoSchema);