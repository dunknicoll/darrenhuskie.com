var DH = {

	doHistoryAPI: function() {
		// History API script

		// Check whether the browser supports the History API
		var supported = supportsHistoryAPI();

		if(supported) {
			// Add click event handlers to our links
			addHistoryAPIHandlers();
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

function addHistoryAPIHandlers() {

	$('a').click(function(event) {
		event.preventDefault();
		loadContent($(this).attr('href'));
    	history.pushState(null, null, $(this).attr('href'));
  	});

	window.addEventListener('popstate', function(e) {
    	loadContent(window.location.pathname);
	});
}

function loadContent(link) {
	var body = $('body'),
		content_url = '/content/content.json',
		page_container = $('.page-container');

	// Check if link is homepage
	if(link == '/') {
		link = '/index.html';
	}

	// Hide the page content, in preparation for the content update
    page_container.addClass('hide');

    var t = setTimeout(function() {

		// Load the desired content through AJAX
		$.getJSON(content_url, function(data) {

		    // Replace the page content
		    page_container.html(data[link].content);

		    // Update the body class
		    body.removeClass();
		    body.addClass(data[link].body_class);

		    // Display the content again after a small delay
		    page_container.removeClass('hide')
	    });

    }, 1000);
}