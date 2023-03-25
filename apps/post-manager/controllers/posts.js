const c = require('../config');
const { readPosts } = require('../model/readPosts');
const { sendOk, sendFail } = require('../../../utils/response-handler');
const { queryStringValidate } = require('../../../utils/queryValidate');
const { verifyToken } = require('../../../utils/tokenManager')

function getSinglePost(req, res) {
    verifyToken(req, res)
    const articleId = req.query.postId;
    const condition = `"article".articleId = ${articleId}`;
    let userId = req.user ? req.user.userId : 0; // set userId = 0 where there is no valid token
    readPosts(condition, 1, userId)
        .then(data => sendOk(res, data))
        .catch(() => {
            console.log("ERROR SINGLE POST REQUEST")
            sendFail(res, c.statusCodes.BAD_REQUEST, { message: c.errors.BAD_REQUEST.message })
        })
}
function getPosts(req, res) {
    const qs = req.query;
    console.log('qs: ', qs);
    let condition = qs.profileid ? `"article".userid = ${qs.profileid}` : "true";
    let limit = qs.limit ? qs.limit : c.defaultLimit;
    if (qs.offset) {
        limit += ` offset ${qs.offset}`
    }
    const token = verifyToken(req, res)
    let userId = token ? +token.userId : 0;
    // let userId = req.user ? req.user.userId : 0; // set userId = 0 where there is no valid token
    readPosts(condition, limit, userId)
        .then(data => sendOk(res, data))
        .catch((e) => {
            console.log("ERROR ON READ POSTS.", e);
            sendFail(res, c.statusCodes.INTERNAL_ERROR, { message: c.errors.INTERNAL_ERROR.message });
        })
}
function getFollowingPosts(req, res) {
    verifyToken(req, res)
    const qs = req.qs;
    if (!queryStringValidate(qs, ['limit', 'offset'])) {
        return sendFail(res, c.statusCodes.BAD_REQUEST, { message: c.errors.BAD_REQUEST.message });
    }
    let condition = `"article".userid in (select followingid from "follow" where "follow".followerid = ${req.user.userId})`;
    let userId = req.user ? req.user.userId : 0; // set userId = 0 where there is no valid token
    let limit = qs.limit ? qs.limit : c.defaultLimit;
    if (qs.offset) {
        limit += ` offset ${qs.offset}`
    }
    readPosts(condition, limit, userId)
        .then(data => sendOk(res, data))
        .catch(() => {
            console.log("ERROR ON READ POSTS.");
            sendFail(res, c.statusCodes.INTERNAL_ERROR, { message: c.errors.INTERNAL_ERROR.message });
        })
}
module.exports = { getPosts, getSinglePost, getFollowingPosts };
