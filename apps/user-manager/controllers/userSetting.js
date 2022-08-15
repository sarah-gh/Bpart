const c = require('../config');
const { readProfileSetting, updateProfileSetting} = require('../model/profileSetting');
const { sendOk, sendFail } = require('../../../utils/response-handler');
const { queryStringValidate } = require('../../../utils/queryValidate')

function getUserInfo(req, res) {
    const qs = req.qs;
    if (!queryStringValidate(qs, [])) {
        return sendFail(res, c.statusCodes.NOT_FOUND, { message: c.errors.NOT_FOUND.message });
    }
    const userId = req.user?.userId;
    const response = readProfileSetting(userId)
    response
        .then((data) => {
            delete data[0]?.password;
            sendOk(res, data);
        })
        .catch(err => {
            console.log(err);
            sendFail(res, c.statusCodes.INTERNAL_ERROR, { message: c.errors.INTERNAL_ERROR.message });
        });
}
function postUserInfo(req, res){
    const qs = req.qs;
    if (!queryStringValidate(qs, [])) {
        return sendFail(res, c.statusCodes.NOT_FOUND, { message: c.errors.NOT_FOUND.message });
    }
    if (!req.user){
        return sendFail(res, c.statusCodes.UNAUTHORIZED, {message: c.errors.UNAUTHORIZED.message})
    }
    const userId = req.user.userId;
    const response = updateProfileSetting(req.data, userId)
    response
        .then(()=>{
            sendOk(res, {message: c.SUCCESS_MESSAGE})
        })
        .catch((err)=>{
            console.log(err);
            sendFail(res, c.statusCodes.BAD_REQUEST, {message: c.errors.BAD_REQUEST.message})
        })
}
module.exports = { getUserInfo, postUserInfo }