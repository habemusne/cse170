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

		var form_entered = {
			'Name': newUsername,
			'Email': newUserEmail,
			'password': newPassword,
			'retypedPassword': retypedPassword
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
	})
}