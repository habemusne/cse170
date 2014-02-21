var models = require('../models');

exports.checkLogin = function(req, res){
  var userID = req.param.id;
  console.log(userID);

  models.User
    .find({"_id": userID})
    .exec(returnJson);

  function returnJson(err, users){
    if (err) console.log(err);
    res.json(users[0]);
  }


  var form_data = req.body;
  models.User
    .find("Name": form_data.Name)
    
}

exports.addUser = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  var new_user = {
    'Name' : form_data.usrName,
    'Password' : form_data.usrPassword,
  }

  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
  var newUser = new models.User(new_user);
  newUser.save(afterSaving);

  function afterSaving(err){
    if (err) {console.log(err); res.send(500);}
    res.send();
    res.redirect('/');
  }
}