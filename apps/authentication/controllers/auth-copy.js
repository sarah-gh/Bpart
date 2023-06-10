const c = require('../config');
const { generateToken } = require('../../../utils/tokenManager');
const { sendOk, sendFail } = require('../../../utils/response-handler');
const { getUserDataByUsername } = require('../model/getuser');
const { hashPassword } = require('../../../utils/hashPassword');
const { executeQuery } = require('../../../services/queryExecutor')

async function userLogin(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    if (!(username && password)) {
        return sendFail(res, c.statusCodes.UNAUTHORIZED, { message: c.errors.UNAUTHORIZED.message })
    }
    let userData
    try {
        userData = await getUserDataByUsername(username)
    } catch (err) {
        console.log('ERROR ON LOGIN: ',err)
        return sendFail(res, c.statusCodes.UNAUTHORIZED, { message: c.errors.UNAUTHORIZED.message })
    }
    if (!isValidUser(userData, password)) {
        return sendFail(res, c.statusCodes.UNAUTHORIZED, { message: c.errors.UNAUTHORIZED.message })
    }
    const token = generateToken({ "userId": userData.userid })
    
    // ذخیره توکن در پایگاه داده PostgreSQL
    const tokenQuery = {
        text: `INSERT INTO tokens (userId, token) VALUES (${userData.userid}, ${JSON.stringify(token)})`,
        values: [userData.userid, JSON.stringify(token)],
    };
    try {
        await executeQuery(tokenQuery.text);
    } catch (err) {
        console.log('ERROR ON TOKEN INSERTION: ', err);
        return sendFail(res, c.statusCodes.UNAUTHORIZED, { message: c.errors.UNAUTHORIZED.message });
    }
    
    return sendOk(res, token);
}

function isValidUser(userData, password) {
    const hashed = hashPassword(password);
    if (userData?.password === hashed) {
        console.log(true);
        return true;
    }
    return false;
}

module.exports = {
    userLogin
};
