const c = require('../config');
const { deleteArticle, blockingUser, unBlockingUser, commentDelete } = require('../model/admin');
const { sendOk, sendFail } = require('../../../utils/response-handler');
const { verifyToken } = require('../../../utils/tokenManager')
const { executeQuery } = require('../../../services/queryExecutor')

//  به جدول مقاله زمان ایجاد اضافه کنم
// CREATE TABLE example (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(100),
//     created_at timestamptz
// );

// INSERT INTO example (name, created_at)
// VALUES ('John', NOW());


async function blockUser(req, res) {
    verifyToken(req, res)
    let userId = req.user ? +req.user.userId : 0; // set userId = 0 where there is no valid token
    try {
        const query = 'SELECT role FROM "user" WHERE userId = ' + userId
        const response = await executeQuery(query)
        const user = req.body;
        if (response.rows[0].role === 'admin') {
            await blockingUser(user.userId)
            sendOk(res, {})
        } else {
            sendFail(res, c.statusCodes.FORBIDDEN, { message: c.errors.FORBIDDEN.message })
        }
    } catch (error) {
        sendFail(res, c.statusCodes.BAD_REQUEST, { message: c.errors.BAD_REQUEST.message })
    }
}

async function unBlockUser(req, res) {
    verifyToken(req, res)
    let userId = req.user ? +req.user.userId : 0; // set userId = 0 where there is no valid token
    try {
        const query = 'SELECT role FROM "user" WHERE userId = ' + userId
        const response = await executeQuery(query)
        const user = req.body;
        if (response.rows[0].role === 'admin') {
            await unBlockingUser(user.userId)
            sendOk(res, {})
        } else {
            sendFail(res, c.statusCodes.FORBIDDEN, { message: c.errors.FORBIDDEN.message })
        }
    } catch (error) {
        sendFail(res, c.statusCodes.BAD_REQUEST, { message: c.errors.BAD_REQUEST.message })
    }
}

async function deletePost(req, res) {
    verifyToken(req, res)
    let userId = req.user ? +req.user.userId : 0; // set userId = 0 where there is no valid token
    console.log(userId);
    try {
        const query = 'SELECT role FROM "user" WHERE userId = ' + userId
        const response = await executeQuery(query)
        if (response.rows[0].role === 'admin') {
            const qs = req.query;
            if (qs.articleId) {
                try {
                    await deleteArticle(qs.articleId)
                    sendOk(res, {})
                } catch (error) {
                    console.log(error);
                    sendFail(res, c.statusCodes.BAD_REQUEST, { message: c.errors.BAD_REQUEST.message })
                }
            } else {
                sendFail(res, c.statusCodes.BAD_REQUEST, { message: c.errors.BAD_REQUEST.message })
            }
        } else {
            sendFail(res, c.statusCodes.FORBIDDEN, { message: c.errors.FORBIDDEN.message })
        }
    } catch (error) {
        sendFail(res, c.statusCodes.BAD_REQUEST, { message: c.errors.BAD_REQUEST.message })
    }
}

async function deleteComment(req, res) {
    verifyToken(req, res)
    let userId = req.user ? +req.user.userId : 0; // set userId = 0 where there is no valid token
    try {
        const query = 'SELECT role FROM "user" WHERE userId = ' + userId
        const response = await executeQuery(query)
        const comment = req.body;
        if (response.rows[0].role === 'admin') {
            await commentDelete(comment.commentId)
            sendOk(res, {})
        } else {
            sendFail(res, c.statusCodes.FORBIDDEN, { message: c.errors.FORBIDDEN.message })
        }
    } catch (error) {
        sendFail(res, c.statusCodes.BAD_REQUEST, { message: c.errors.BAD_REQUEST.message })
    }
}

module.exports = { blockUser, unBlockUser, deletePost, deleteComment };
