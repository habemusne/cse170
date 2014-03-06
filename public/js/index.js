'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('#authorizationSubmitButton').click(function(e) {
		var username = $('#authorization-form #usrName').val();
		var userPW = $('#authorization-form #usrPassword').val();
		var form_data = {
			'Name': username,
			'password': userPW
		};

		$.post('/authorization', form_data, function(data){
			console.log('introHCI: ' + data);
			window.location.href = data;
		});
	});

	$('#signupSubmitButton').click(function(e) {
		var newUsername = $('#signup-form #newName').val();
		var newUserEmail = $('#signup-form #newEmail').val();
		var newPassword = $('#signup-form #newPW').val();
		var retypedPassword = $('#signup-form #retypePW').val();

 		if (newPassword !== retypedPassword){
    		alert('Your retyped password does not match');
    		return;
  		}


		var form_entered = {
			'Name': $('#signup-form #newName').val(),
			'Email': $('#signup-form #newEmail').val(),
			'password': $('#signup-form #newPW').val(),
			'retypedPassword': $('#signup-form #retypePW').val()
		};

		$.post('/signup/addUser', form_entered, function(data){
			window.location.href = data;
		});
	});

	$('#signupButton').click(function(e) {
		window.location.href = '/signup';
	});

	$('#forgetButton').click(function(e) {
		window.location.href = '/forget';
	});

	$('#addPhotoButton').click(function(e) {
		window.location.href = '/addphoto';
	});

	$('#helpButton').click(function(e) {
		window.location.href = '/help';
	});

	$('#setButton').click(function(e) {
		window.location.href = '/set';
	});

	$('#newPhotoSubmitButton').click(function(e) {

		var form_entered = {
			'title': $('#newPhotoForm #photoName').val(),
			'summary': $('#newPhotoForm #photoTags').val(),
			'image': $('#newPhotoForm #photoURL').val()
		};

		$.post('/addphoto/addsubmit', form_entered, function(data){
			window.location.href = data;
		});
	});

	$('#signoutButton').click(function(e) {
		req.session.loggedin = false;
      	req.session.userID = null;
	});

	$('#homeButton').click(function(e) {
		if (req.session.loggedin == false){
			window.location.href = '/index';
		}
		else{
			window.location.href = '/main';
		}
	});
}