
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


function getProfileById(req, res) {
    const token = verifyToken(req, res)
    let userId = token ? +token.userId : 0; // if we have no valid token, we set userId = 0
    let profileId = (token && !req.params.userId) ? +token.userId : +req.params.userId;
    let postLimit = c.defaultPostLimit;
    const response = readProfile(userId, profileId, postLimit);
    response
        .then(data => sendOk(res, data))
        .catch(() => sendFail(res, c.statusCodes.NOT_FOUND, c.errors.NOT_FOUND))
}
module.exports = {
    getProfileById
}