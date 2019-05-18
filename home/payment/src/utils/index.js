const parseUrl = () => {
	var searchHref = window.location.search.replace('?', '');
	var params = searchHref.split('&');
	var returnParam = {};
	params.forEach((param) => {
		var paramSplit = param.split('=');
		returnParam[paramSplit[0]] = paramSplit[1];
	});
	return returnParam;
}

export default parseUrl;

export {
	
}