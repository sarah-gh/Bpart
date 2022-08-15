const c = require('../config');
const { operationHandler } = require('../handlers/operationHandler');
const { sendOk, sendFail } = require('../../../utils/response-handler');

function operationRegister(req, res) {
    if (!req.user) {
        return sendFail(res, c.statusCodes.UNAUTHORIZED, { message: c.errors.UNAUTHORIZED.message });
    }
    const postData = req.data;
    const handler = operationHandler(req)
    handler(postData, req.user.userId)
        .then(() => sendOk(res, { message: c.SUCCESS_MESSAGE }))
        .catch(err => {
            console.log("ERROR ON INSERT OPERATION: ", err);
            sendFail(res, c.statusCodes.BAD_REQUEST, { message: c.errors.BAD_REQUEST.message });
        })
}
module.exports = { operationRegister }
