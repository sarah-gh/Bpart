const queryString = require('querystring')
function urlDecoder(url) {
    const segments = url.split('?');
    let route;
    if (segments[0].slice(-1) == '/') {
        route = segments[0].slice(0, -1);
    } else {
        route = segments[0];
    }
    let qs;
    if (segments[1]) {
        qs = queryString.parse(segments[1].toLocaleLowerCase());
    } else {
        qs = "";
    }
    return { route, qs };
}

module.exports = { urlDecoder }