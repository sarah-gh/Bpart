const c = require('../config')
const { queryStringValidate } = require('../../../utils/queryValidate');
const { sendOk, sendFail } = require('../../../utils/response-handler');
const { searchQuery } = require('../model/searchResponse')

function searchInputQuery(req, res) {
    const pathName = req.pathName;
    const qs = req.qs;
    if (!queryStringValidate(qs, ['query'])) {
        sendFail(res, c.statusCodes.BAD_REQUEST, { message: c.errors.BAD_REQUEST.message });
        return;
    }
    const query = qs.query;
    const userId = req.user ? req.user.userId : 0;
    searchQuery(query, userId)
        .then(data => sendOk(res, data))
        .catch((err) => {
            if (err.code == 42601) {
                sendFail(res, c.statusCodes.BAD_REQUEST, { message: c.errors.BAD_REQUEST.message });
            } else {
                console.log(err)
                sendFail(res, c.statusCodes.INTERNAL_ERROR, { meessage: c.errors.INTERNAL_ERROR.message });
            }
        })
}

module.exports = { searchInputQuery }