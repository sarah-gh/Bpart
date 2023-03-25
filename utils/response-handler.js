const c = require('../config');

async function sendOk(res, data) {
    res.statusCode = c.statusCodes.SUCCESS;
    res.setHeader('Content-Type', c.contentTypes.JSON);
    // res.set({"Content-Type": c.contentTypes.JSON})
    await res.end(JSON.stringify(data));
}

async function sendFail(res, statusCode, data) {
    res.statusCode = statusCode;
    // res.set({"Content-Type": c.contentTypes.JSON})
    res.setHeader('Content-Type', c.contentTypes.JSON);
    await res.end(JSON.stringify(data));
}

module.exports = { sendOk, sendFail }