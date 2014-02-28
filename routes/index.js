var models = require('../models');
//var fs = require('fs');
//var photos_json = require('../photos.json');

/*
 * GET home page.
 */

exports.indexView = function(req, res){
	res.render('index');
};

exports.mainView = function(req, res){
	console.log('index.js: mainView: ' + req.session.userID);
    models.Photo
    	.find({"userID": req.session.userID})
    	.exec(renderPhotos);

    function renderPhotos(err, photos) {
        if (err){console.log(err); res.send(500);}
    	console.log(photos);
    	res.render('main', {'photos': photos});
    }
};

exports.signupView = function(req, res){
    res.render('signup');
};

exports.forgetView = function (req, res){
	res.render('forget');
};
exports.helpView = function (req, res){
    res.render('help');
};
exports.setView = function (req, res){
    res.render('set');
};
