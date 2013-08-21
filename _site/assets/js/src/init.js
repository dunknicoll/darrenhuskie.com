var DH = {

	doHistoryAPI: function() {
		// History API script

		// Check whether the browser supports the History API
		var supported = supportsHistoryAPI();

		if(supported) {
			// Add click event handlers to our links
			addHistoryAPIClickHandlers();
		}
	},

    applyAnimations: function() {
        // Apply animations to elements
    }

}

$(function()
{
	DH.doHistoryAPI();
    DH.applyAnimations();
});

// Static functions

function supportsHistoryAPI() {
	return !!(window.history && history.pushState);
}

function addHistoryAPIClickHandlers() {
	$('a').click(function(event) {
		event.preventDefault();
		loadContent($(this).attr('href'));
    	//history.pushState(null, null, link.href);
  	});
}

function loadContent(link) {
	// Prepare the URL parameter
	var content_url = '/content/' + link.substring(12);
	content_url = content_url.replace('.html', '.json');

	// Load the desired content through AJAX
	$.ajax({
  		dataType: 'json',
  		url: content_url,
  		success: function() {
  			console.log('Boom');
  		}
	});
}