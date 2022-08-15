const c = require('../config');

function sendOk(res, data) {
    res.statusCode = c.statusCodes.SUCCESS;
    res.setHeader('Content-Type', c.contentTypes.JSON);
    res.end(JSON.stringify(data));
}

function sendFail(res, statusCode, data) {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', c.contentTypes.JSON);
    res.end(JSON.stringify(data));
}

module.exports = { sendOk, sendFail }