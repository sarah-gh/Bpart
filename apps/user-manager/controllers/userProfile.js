
const c = require('../config');
const { readProfile } = require('../model/readProfile');
const { sendOk, sendFail } = require('../../../utils/response-handler');
const { queryStringValidate } = require('../../../utils/queryValidate')
const { verifyToken } = require('../../../utils/tokenManager')
const redis = require('../../../redis');
const util = require('util');

redis.dataStorage.on("error", function(error) {
    console.error('dataStorage',error);
});
redis.dataStorage.set = util.promisify(redis.dataStorage.set);
redis.dataStorage.del = util.promisify(redis.dataStorage.del);


async function getProfileById(req, res) {
    try {
        verifyToken(req, res)
        const token = req.user
        let userId = token ? +token.userId : 0; // if we have no valid token, we set userId = 0
        let profileId = (token && !+req.params.userId) ? +token.userId : +req.params.userId;
        let postLimit = c.defaultPostLimit; 
        const response = await readProfile(userId, profileId, postLimit);
        await sendOk(res, response)
    } catch (error) {
        console.log(error);
        await sendFail(error, c.statusCodes.NOT_FOUND, c.errors.NOT_FOUND)
    }
    
}
module.exports = {
    getProfileById
}