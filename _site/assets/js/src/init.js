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
	var content_url = '/content/content.json',
		page_container = $('.page');

	console.log(content_url);
	console.log(link);

	// Load the desired content through AJAX
	$.getJSON(content_url, function(data) {
        console.log('Data: ' + data[link]);

        // Replace the page content
        page_container.html(data[link]);
    });
}