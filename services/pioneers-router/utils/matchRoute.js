function matchRoute(routes, path, method) {
    if( path.startsWith("/api/images")){
        return {route: "/api/images", params:{}}
    }
    for (route of Object.keys(routes)) {
        const routeSplit = route.split('/');
        for (let i = 0; i < routeSplit.length; i++) {
            if (routeSplit[i][0] === ":") {
                routeSplit[i] = '(.?[0-9]+)';
            }
        }
        const pattern = new RegExp(routeSplit.join('/') + '$');
        const matched = path.match(pattern);
        if (!matched) continue;
        if(!routes[route][method]){
            return;
        }
        matched.shift();
        const r = { route, params:{} };
        for (param of route.split('/')) {
            if (param[0] === ":") {
                r.params[param.substring(1)] = matched[0];
                matched.shift();
            }
        }
        return r;
    }
    return;
}
module.exports = { matchRoute }