const c = require('../config');
const { sendOk, sendFail } = require('../../../utils/response-handler');
const { queryStringValidate } = require('../../../utils/queryValidate');
const { generateCsrfToken } = require('../model/csrfToken');


function getCsrfToken(req, res) {
    const qs = req.query;
    if (!queryStringValidate(qs, [])) {
        return sendFail(res, c.statusCodes.NOT_FOUND, { message: c.errors.NOT_FOUND.message });
    }
    if (!req.user) {
        return sendFail(res, c.statusCodes.UNAUTHORIZED, c.errors.UNAUTHORIZED.message);
    }
    generateCsrfToken(req.user.userId)
        .then(data => sendOk(res, data))
        .catch(err => {
            console.log(err);
            sendFail(res, c.statusCodes.INTERNAL_ERROR, c.errors.INTERNAL_ERROR.message);
        })
}

module.exports = { getCsrfToken }