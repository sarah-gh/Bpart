const c = require('../config');
const { readSavedMessages } = require('../model/savedMessages');
const { sendOk, sendFail } = require('../../../utils/response-handler');
const { queryStringValidate } = require('../../../utils/queryValidate');
const { verifyToken } = require('../../../utils/tokenManager')

function getSavedMessages(req, res) {
    verifyToken(req, res)
    const qs = req.query;
    if (!queryStringValidate(qs, ['limit', 'offset'])) {
        return sendFail(res, c.statusCodes.NOT_FOUND, { message: c.errors.NOT_FOUND.message });
    }
    const userId = req.user.userId;
    limit = qs.limit ? qs.limit : c.defaultPostLimit;
    if (qs.offset) {
        limit += ` offset ${qs.offset}`;
    }
    const response = readSavedMessages(userId, limit);
    response
        .then(data => sendOk(res, data))
        .catch(() => {
            console.log("ERROR HANDLE GET SAVED MESSAGES REQUEST");
            sendFail(res, c.statusCodes.BAD_REQUEST, { message: c.errors.BAD_REQUEST.message });
        });
}
module.exports = {
    getSavedMessages
}