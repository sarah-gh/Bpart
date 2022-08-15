const c = require('../config');
const { readComments } = require('../model/readComments');
const { sendOk, sendFail } = require('../../../utils/response-handler');
const { queryStringValidate } = require('../../../utils/queryValidate');

function getComments(req, res) {
    const pathName = req.pathName;
    const qs = req.qs;
    if (!queryStringValidate(qs, ['limit', 'offset'])) {
        return sendFail(res, c.statusCodes.BAD_REQUEST, { message: c.errors.BAD_REQUEST.message });
    }
    const articleId = req.params.postId;
    let limit = qs.limit ? qs.limit : c.defaultLimit;
    if (qs.offset) {
        limit += ` offset ${req.qs.offset}`
    }

    const response = readComments(articleId, limit)
    response
        .then(data => sendOk(res, data))
        .catch(() => {
            console.log("ERROR ON READ COMMENTS.")
            sendFail(res, c.statusCodes.BAD_REQUEST, { message: c.errors.BAD_REQUEST.message })
        });
}
module.exports = { getComments };