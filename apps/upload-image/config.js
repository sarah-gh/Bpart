const statusCodes = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500
};

const contentTypes = {
    PNG: 'image/png',
    JPG: 'image/jpg'
};

const errors = {
    NOT_FOUND: {
        title: 'routeNotFound',
        message: 'Requested route/method not found!'
    },
    INTERNAL_ERROR: {
        title: 'internalError',
        message: 'Error handle request.'
    }
};

module.exports = {
    statusCodes,
    contentTypes,
    errors
};
