$(document).ready(function() {

	var searchButton = $('#search');
	var searchField = $('#searchField');
	var output = $('#output');

	// Trigger the search if enter is pressed
	searchField.on("keyup", function(event) {
		var key = event.which;
		if(key == 13) {
			searchButton.trigger('click');
			return false;
		}
	});

	// Trigger the search when the button is pressed
	searchButton.on('click', function(event) {
		event.preventDefault();

		output.empty();
		var search = searchField.val();
		var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + search + '&format=json&callback=?';

		$.ajax(url, {
			type: 'GET',
			dataType: 'json',
			success: function(response) {
				var resultList = response[1];
				var resultDescription = response[2];
				var resultLinks = response[3];

				$.map(resultList, function(content, i) {
					$('<li class="title"><a href="' + resultLinks[i] + '">' + resultList[i] + '</a></li>').appendTo(output);
					$('<li class="desc">' + resultDescription[i] + '</li>').appendTo(output);

				});
			},
			error: function(request, errorType, errorMessage) {
				alert("Error: " + errorType + " with message: " + errorMessage);
			},
			timeout: 3000,
			beforeSend: function() {

			},
			complete: function() {

			}

		});

	});


});


