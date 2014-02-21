'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.user a').click(function(e) {
		// Prevent following the link
		e.preventDefault();

		// Get the div ID, e.g., "project3"
		var userID = $(this).closest('.user').attr('id');
		// get rid of 'project' from the front of the id 'project3'
		var idNumber = userID.substr('user'.length);

		// this is the URL we'll call
		var url_call = '/user/'+idNumber;

		// How to respond to the GET request
		function addUserDetails(user_json) {
			// We need to compute a display string for the date
			// Search 'toLocaleDateString' online for more details.
			var date_obj = new Date(user_json['date']);
			var options = {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric"
			};
			var display_date = date_obj.toLocaleDateString('en-US', options);

			// compose the HTML
			var new_html =
				'<div class="project-date">'+display_date+'</div>'+
				'<div class="project-summary">'+user_json['summary']+'</div>'+
				'<button class="project-delete btn btn-default" '+
					'type="button">delete</button>';

			// get the DIV to add content to
			var details_div = $('#project' + idNumber + ' .details');
			// add the content to the DIV
			details_div.html(new_html);

			details_div.find('.project-delete').click(function(e) {
				$.post('/project/'+idNumber+'/delete', function() {
					window.location.href = '/';
				});
			});
		}

		// issue the GET request
		$.get(url_call, addUserDetails);
	});

	$('#authorizationSubmitButton').click(function(e) {

		var username = $('#authorization-form #usrName').val();
		var userPW = $('#nauthorization-form #usrPassword').val();

		var form_data = {
			'Name': username,
			'password': userPW
		};

		$.post('/users/checkPW', form_data, function(){
			window.location.href = '/';
		}
	});
}

