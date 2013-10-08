// Functions

var DH = DH || {};

DH.doHistoryAPI = function() {
	// History API script

	// Check whether the browser supports the History API
	var supported = DH.supportsHistoryAPI();

	if(supported) {
		// Add the loader
		DH.addLoadElement();

		// Add click event handlers to our links
		DH.addHistoryAPIHandlers();
	}
};

DH.supportsHistoryAPI = function() {
	return !!(window.history && history.pushState);
};

DH.addLoadElement = function() {
	var load_element = document.createElement('div'),
		page = $('body');

	load_element.className = 'page-loader';
	page.prepend(load_element);
};

DH.addHistoryAPIHandlers = function() {
	$('a[rel=internal]').click(function(event) {
		event.preventDefault();
		DH.loadContent($(this).attr('href'));
		history.pushState(null, null, $(this).attr('href'));
	});

	window.addEventListener('popstate', function(e) {
		//loadContent(window.location.pathname);
	});
};

DH.loadContent = function(link) {
	var body = $('body'),
		content_url = '/content/content.json',
		home = false,
		page_container = $('.page-container'),
		page_loader = $('.page-loader');

	// Check if link is homepage
	if(link == '/') {
		home = true;
		link = '/index.html';
	}

	// Show the loader, in preparation for content load
	page_loader.addClass('show');

	var t = setTimeout(function() {

	// Load the desired content through AJAX
	$.getJSON(content_url, function(data) {

		// Replace the page content
		if(home) {
		   	page_container.html(data[link].content);
		}
		else {
		   	page_container.html(data[link].title + data[link].content);
			}

		    // Update the body class
		    body.removeClass();
		    body.addClass(data[link].body_class);

		    // Hide the loader, now the content has loaded
		    page_loader.removeClass('show');

		    // Re-bind the click event handlers
		    DH.addHistoryAPIHandlers();
		});
	}, 2000);
};

DH.applyAnimations = function() {
    // Apply animations to elements
};


// DOM ready function calls
(function ($, window, document, undefined) {

	'use strict';

  	$(function () {
    	DH.doHistoryAPI();
    	DH.applyAnimations();
  	});

})(jQuery, window, document);