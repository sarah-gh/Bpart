const c = require('../config');
const { insertNewUser } = require('../model/newUser')
const { sendOk, sendFail } = require('../../../utils/response-handler');
const { isUsernameAvailable } = require('../model/checkUsername')
const { generateToken } = require('../../../utils/tokenManager');

async function userRegister(req, res) {
    const inputData = req.data;
    let isAvailable;
    try {
        isAvailable = await isUsernameAvailable(req.data.username);
    } catch (err) {
        return sendFail(res, c.statusCodes.BAD_REQUEST, { message: c.errors.BAD_REQUEST.message });
    }
    if (!isAvailable) {
        return sendFail(res, c.statusCodes.CONFLICT, { message: c.errors.CONFLICT.message });
    }
    insertNewUser(inputData)
        .then(user => {
            const token = generateToken({ "userId": user.userid });
            sendOk(res, { token });
        })
        .catch(err => {
            console.log(err);
            sendFail(res, c.statusCodes.INTERNAL_ERROR, { message: c.errors.INTERNAL_ERROR.message });
        })
}
module.exports = { userRegister }