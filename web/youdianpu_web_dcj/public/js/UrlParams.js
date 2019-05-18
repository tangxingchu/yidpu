var urlParams = (function(url) {
	var result = new Object();
	var idx = url.lastIndexOf('?');

	if (idx > 0) {
		var params = url.substring(idx + 1).split('&');

		for (var i = 0; i < params.length; i++) {
			idx = params[i].indexOf('=');

			if (idx > 0) {
				result[params[i].substring(0, idx)] = params[i]
						.substring(idx + 1);
			}
		}
	}

	return result;
})(window.location.href);

// Default resources are included in grapheditor resources
mxLoadResources = false;