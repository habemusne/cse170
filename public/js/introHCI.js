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

		$.post('/users/checkPW', form_data, function(data){
			console.log('introHCI: ' + data);
			window.location.href = data;
		});
	});

	$('#signinSubmitButton').click(function(e) {
		var newUsername = $('#signin-form #newName').val();
		var newUserEmail = $('#signin-form #newEmail').val();
		var newPassword = $('#signin-form #newPW').val();
		var retypedPassword = $('#signin-form #retypePW').val();

		var json = {
			'Name': newUsername,
			'Email': newUserEmail,
			'password': newPassword,
			'retypedPassword': retypedPassword
		};

		$.post('/users/new', json, function(data){
			window.location.href = data;
		});
	});

	$('#forgetButton').click(function(e) {
		window.location.href = '/html/forget.html';
	});
}