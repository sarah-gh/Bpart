const statusCodes = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
    BAD_REQUEST:400
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
    BAD_REQUEST:{
        title: "bad request",
        message: "invalid request"
    }
};

const defaultLimit = 5
module.exports = {
    statusCodes,
    contentTypes,
    errors,
    defaultLimit
};