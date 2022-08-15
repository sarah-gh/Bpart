const c = require('../config');
const { generateToken } = require('../../../utils/tokenManager');
const { sendOk, sendFail } = require('../../../utils/response-handler');
const { getUserDataByUsername } = require('../model/getuser');
const { hashPassword } = require('../../../utils/hashPassword');
const redis = require('../../../redis');
const util = require('util');

redis.dataStorage.on("error", function(error) {
    console.error('dataStorage',error);
});
redis.dataStorage.set = util.promisify(redis.dataStorage.set);
redis.dataStorage.del = util.promisify(redis.dataStorage.del);

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
    // if (!isValidUser(userData, password)) {
    //     return sendFail(res, c.statusCodes.UNAUTHORIZED, { message: c.errors.UNAUTHORIZED.message })
    // }
    const token = generateToken({ "userId": userData.userid })
    redis.dataStorage.set( userData.userid , JSON.stringify(token));
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