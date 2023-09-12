const statusCodes = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    BAD_REQUEST:400,
    BLOCKED: 403,
    CONFLICT:409
};

const contentTypes = {
    JSON: 'application/json'
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
    BLOCKED : {
        title: 'BLOCKED',
        message: 'You are blocked'
    },
    FORBIDDEN : {
        title: 'forbidden',
        message: 'username already exists'
    },
    BAD_REQUEST: {
        title: 'bad request',
        message: 'invalid input'
    },
    CONFLICT: {
        title: "conflict",
        message: "username is not available"
    }
};
const SUCCESS_MESSAGE = "operation done successfully"

const defaultPostLimit = 5;
const defaultFollowerLimit = 20;

module.exports = {
    statusCodes,
    contentTypes,
    errors,
    defaultPostLimit,
    defaultFollowerLimit,
    SUCCESS_MESSAGE
};
