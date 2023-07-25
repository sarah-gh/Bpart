const c = require('../config');
const { readProfile } = require('../model/readProfile');
const { sendOk, sendFail } = require('../../../utils/response-handler');
const { queryStringValidate } = require('../../../utils/queryValidate')
const { verifyToken } = require('../../../utils/tokenManager')

async function getProfileById(req, res) {
    console.log('getProfileById');
    try {
        verifyToken(req, res)
        const token = req.user
        if(token) {
            let userId = token ? +token.userId : 0; // if we have no valid token, we set userId = 0
            let profileId = (token && !+req.params.userId) ? +token.userId : +req.params.userId;
            let postLimit = c.defaultPostLimit; 
            const response = await readProfile(userId, profileId, postLimit);
            await sendOk(res, response)
        } else {
            await sendFail(res, c.statusCodes.NOT_FOUND, c.errors.NOT_FOUND)
        }
        
    } catch (error) {
        console.log(error);
        await sendFail(error, c.statusCodes.NOT_FOUND, c.errors.NOT_FOUND)
    }
    
}
module.exports = {
    getProfileById
}