var models = require('../models');

exports.checkLogin = function(req, res){
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
      res.send('/html/index.html');
      //res.redirect('/html/index.html');
    }
    else{
      console.log('user: correct pw');
      //res.send('/html/main.html');
      res.send('http://lab777.herokuapp.com');
      //res.redirect('/html/main.html');
    }

  }
}

exports.addUser = function(req, res) {
  var form_data = req.body;
  console.log(form_data);
/*  if (form_data.newPassword != form_data.retypedPassword){
    res.send(500);
    return;
  }
*/
  var parsed_data = {
    'Name': form_data.Name,
    'Email': form_data.Email,
    'password': form_data.password
  };

  console.log(parsed_data);

  var newUser = new models.User(parsed_data);
  newUser.save(afterSaving);

  function afterSaving(err){
    if (err){console.log(err); res.send(500);}
    res.send('http://lab777.herokuapp.com');
  }
}