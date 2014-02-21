
var models = require('../models');

/*
 * GET home page.
 */

exports.view = function(req, res){

	models.User
		.find()
		.exec(renderUsers);

	function renderUsers(err, users) {
		res.render('index', { 'users': users });
		//console.log(users);
	}

};