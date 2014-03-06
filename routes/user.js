var models = require('../models');
var fs = require('fs');

exports.authorization = function(req, res){
  var form_body = req.body;
  //var form_data = req.body;
  //console.log(models.User);
  var username = form_body.Name;
  var userPW = form_body.password;

  models.User
    .find({"Name": username, "password": userPW})
    .exec(checkPW);

  function checkPW(err, users){
    if (err){console.log(err); res.send(500);}
    /*console.log(users);
    console.log(form_data.password);
    */
    console.log(users);
    if (users.length == 0){
      console.log('user: wrong pw');
      res.send('/');
      //res.redirect('/html/index.html');
    }
    else{
      console.log('user: correct pw');
      req.session.userID = users[0].userID;
      req.session.loggedin = true;
      console.log('session saved');
      res.send('/main');
      //res.send('http://lab777.herokuapp.com');
      //res.redirect('/html/main.html');
    }
  }
}

exports.addUser = function(req, res) {

  var form_data = req.body;
  console.log(form_data);

  //
  //Chen Nan shuo: 
  //I stored the number of users in the file "app_info"
  //The following code finds this number and increase it by 1
  //
  var userAmount;
  fs.readFile('./app_info', "binary", function(err, data){
    if (err) console.log(err);
    userAmount = parseInt(data.split(" ")[1]) + 1;
    fs.writeFile('./app_info', "userAmount " + userAmount);
  });

  var newData = {
    'userID': userAmount,
    'Name': form_data.Name,
    'Email': form_data.Email,
    'password': form_data.password
  };

  var newUser = new models.User(newData);
  newUser.save(afterSaving);

  function afterSaving(err){
    if (err){console.log(err); res.send(500);}
    res.send('/main');
  }
}

exports.addPhoto = function (req, res) {
  res.render('add');
}

exports.addPhotoSubmit = function (req, res) {
  var form_body = req.body;
  
  var date = new Date();
  console.log('date: ' + date);

  var photoTitle;
  if (req.body.title == null)
    photoTitle = date;
  else
    photoTitle = form_body.title;

  var newData = {
    'userID': req.session.userID,
    'title': form_body.title,
    'date': new Date(),
    'summary': form_body.summary,
    'image': form_body.image
  };

  var newPhoto = new models.Photo(newData);
  newPhoto.save(afterSaving);

  function afterSaving(err){
    if (err){console.log(err); res.send(500);}
    console.log('Your photo is saved');
    res.send('/main');
  }
}