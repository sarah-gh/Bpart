const statusCodes = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    BAD_REQUEST:400
};
const errors = {
    NOT_FOUND: {
        title: 'routeNotFound',
        message: 'Requested route/method not found!'
    },
    INTERNAL_ERROR: {
        title: 'internalError',
        message: 'Error handle request.'
    },
    UNAUTHORIZED: {
        title: 'unauthorized',
        message: 'not valid token'
    },
    FORBIDDEN : {
        title: 'forbidden',
        message: 'username already exists'
    },
    BAD_REQUEST:{
        title: "bad request",
        message: "invalid input"
    }
};

module.exports = {
    statusCodes,
    errors
}