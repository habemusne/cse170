var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(express);

var index = require('./routes/index');
var user = require('./routes/user');
var project = require('./routes/project');
var index_project = require('./routes/index_project');
// Example route
// var user = require('./routes/user');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'feizi';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.indexView);
app.get('/main', index.mainView);
app.get('/signup', index.signupView);
app.post('/signup/addUser', user.addUser);
app.post('/authorization', user.authorization);
app.get('/forget', index.forgetView);
app.post('/addphoto/addsubmit', user.addPhotoSubmit);
app.get('/addphoto', user.addPhoto);
app.get('/help', index.helpView);
app.get('/set', index.setView);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});