const c = require('../config');
const { sendFail } = require('../../../utils/response-handler');
const { executeQuery } = require('../../../services/queryExecutor');

async function csrfValidate(req, res, next) {
    if (!req.data?.csrfToken || !req.user) {
        return sendFail(res, c.statusCodes.UNAUTHORIZED, c.errors.UNAUTHORIZED.message);
    }
    const query = `SELECT * FROM "csrf" WHERE userId = ${req.user.userId}`;
    let response = await executeQuery(query);
    if (!response?.rows[0].token === req.data.csrfToken) {
        return sendFail(res, c.statusCodes.UNAUTHORIZED, c.errors.UNAUTHORIZED.message)
    }
    next()
}

module.exports = { csrfValidate }