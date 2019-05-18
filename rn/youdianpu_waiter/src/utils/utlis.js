const parseUrl = function(url) {
    var returnParam = {};
    var searchHref = url.split('?');
    if(searchHref.length == 1) {
        return returnParam;
    } else {
        var params = searchHref[1].split('&');
        params.forEach(function(param){
            var paramSplit = param.split('=');
            returnParam[paramSplit[0]] = paramSplit[1];
        });
        return returnParam;
    }    
}

export default parseUrl

export {}