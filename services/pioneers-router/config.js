const statusCodes = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500
};

const contentTypes = {
    JSON: 'application/json',
    HTML: 'text/html',
    JPG: 'image/jpg',
    PNG: 'image/png',
};

const errors = {
    routeNotFound: {
        title: 'routeNotFound',
        message: 'Requested route/method not found!'
    },
    internalError: {
        title: 'internalError',
        message: 'Error handle request.'
    }
};

module.exports = {
    statusCodes,
    contentTypes,
    errors
};

