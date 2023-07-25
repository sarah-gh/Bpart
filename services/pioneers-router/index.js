const c = require('./config')
const { matchRoute } = require('./utils/matchRoute')
const { urlDecoder } = require('./utils/urlDecoder')

class Router {
    constructor(config) {
        this._eventEmitter = config.eventEmitter;
        this._event = config.event;
        this._routes = {};
        this._setRequestListener();
    }

    addRoute(routeObj) {
        if (!this._routes.hasOwnProperty(routeObj.route)) {
            this._routes[routeObj.route] = {};
        }
        this._routes[routeObj.route][routeObj.method] = {
            function: routeObj.function,
            middlewares: routeObj.middlewares
        };
    }
    _route(req, res) {
        let { route, qs } = urlDecoder(req.url);
        req.pathName = route;
        req.qs = qs;
        const matchedRoute = matchRoute(this._routes, route, req.method);
        if (!matchedRoute) {
            console.log(`${c.errors.routeNotFound.title}: ${c.errors.routeNotFound.message} -> ${req.method} ${route}`);
            this._sendNotFoundResponse(res);
            return;
        }
        req.params = matchedRoute.params;
        req.routePattern = matchedRoute.route;
        let middlewares = this._routes[matchedRoute.route][req.method].middlewares;
        let handler = this._routes[matchedRoute.route][req.method].function;
        let firstMiddleware = prepareMiddlewares(middlewares.length - 1, req, res, () => handler(req, res));
        try {
            firstMiddleware();
        } catch {
            this._sendInternalErrorResponse(res);
        }
        function prepareMiddlewares(index, req, res, next) {
            if (index === -1) {
                return next;
            }
            return prepareMiddlewares(index - 1, req, res, () => middlewares[index](req, res, next));
        }
    }
    _setRequestListener() {
        this._eventEmitter.on(this._event, (req, res) => {
            this._route(req, res)
        });
    }
    _sendNotFoundResponse(res) {
        res.stasusCode = c.statusCodes.NOT_FOUND;
        res.setHeader('Content-Type', c.contentTypes.JSON);
        res.end(JSON.stringify(c.errors.routeNotFound));
    }
    _sendInternalErrorResponse(res) {
        res.stasusCode = c.statusCodes.INTERNAL_ERROR;
        res.setHeader('Content-Type', c.contentTypes.JSON);
        res.end(JSON.stringify(c.errors.internalError));
    }
}

module.exports = Router;