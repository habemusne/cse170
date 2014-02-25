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
      console.log('session saved');
      res.send('/main');
      //res.send('http://lab777.herokuapp.com');
      //res.redirect('/html/main.html');
    }

  }
}

exports.addUser = function(req, res) {
  /*
    console.log('mainView: ' + req.session.userID);
    var filename = req.session.userID + '_list';
    var emptyData = "";
    fs.readFile('./user_photos/' + filename, "binary", function(err, data){
      if (err){
        console.log('Your photo list does not exist. Creating... ')
        fs.writeFile('./user_photos/' + filename, emptyData, function(err){
          if(err)
            console.log(err);
          else
            console.log('new file: ./user_photos/' + filename + ' is saved');
        });
      }
      else{
        console.log('Your photo list is found. The Data is ');
        console.log(data);
      }
  });
*/

  var form_data = req.body;
  console.log(form_data);
/*
  if (form_data.newPassword != form_data.retypedPassword){
    res.send('Password not consistent');
    return;
  }
*/

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
    res.send('/');
  }
}

exports.addPhoto = function (req, res) {
  res.render('add');
}