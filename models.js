
var Mongoose = require('mongoose');


var ProjectSchema = new Mongoose.Schema({
  "title": String,
  "image": String,
  "date": Date,
  "summary": String
});

exports.Project = Mongoose.model('Project', ProjectSchema);
