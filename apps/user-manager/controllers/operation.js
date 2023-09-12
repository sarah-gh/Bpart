const c = require('../config');
const { operationHandler } = require('../handlers/operationHandler');
const { sendOk, sendFail } = require('../../../utils/response-handler');
const { verifyToken } = require('../../../utils/tokenManager')
const { executeQuery } = require('../../../services/queryExecutor')

async function operationRegister(req, res) {
    verifyToken(req, res)
    if (!req.user) {
        return sendFail(res, c.statusCodes.UNAUTHORIZED, { message: c.errors.UNAUTHORIZED.message });
    }
    const query = 'SELECT blocked FROM "user" WHERE userId = ' + req.user.userId
    const response = await executeQuery(query)
    if (!response.rows[0].blocked) {
        const postData = req.body;
        console.log('operationRegister: ', postData);
        let userId = req.user ? +req.user.userId : 0; // set userId = 0 where there is no valid token
        const query = 'SELECT role FROM "user" WHERE userId = ' + userId
        const response = await executeQuery(query)
        const handler = operationHandler(req)
        handler(postData, req.user.userId, response.rows[0].role)
            .then(() => sendOk(res, { message: c.SUCCESS_MESSAGE }))
            .catch(err => {
                console.log("ERROR ON INSERT OPERATION: ", err);
                sendFail(res, c.statusCodes.BAD_REQUEST, { message: c.errors.BAD_REQUEST.message });
            })
    } else {
        sendFail(res, c.statusCodes.BLOCKED, { message: c.errors.BLOCKED.message });
    }
}
module.exports = { operationRegister }
