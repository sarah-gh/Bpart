### a module to route your web-api efficiently!

#### class Router can handle requests with any id, name, etc

to use Router you must first fix config following here:
``` bash
config = {
    eventEmitter,
    event,
    routesPattern
}
```
when custom event emited, request route will check by regex patterns. If request url matches one of the patterns, The Router sends request for midlewares and related handler. else Router returns page not found.

#### notice that routesPattern is a dicctionary that have keys same as routes. 
example:
``` bash
routes = {
    '/users': { GET: {}, POST: {} },
    '/users/:id': { GET: {}, POST: {}
}
routesPattern = {
    '/users': /(^\/users$)/,
    '/users/:id': /(^\/users\/\d+$)/
}