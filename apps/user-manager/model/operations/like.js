const { executeQuery } = require('../../../../services/queryExecutor')
const { resultCounter } = require('../../../../services/countResults')

async function likeArticle(postData, userId) {
    let query
    if (postData.status) {
        query = `SELECT * FROM "like_article" WHERE articleId = ${postData.articleId} AND userId = ${userId}`
        const resultCounts = await resultCounter(query)
        if(resultCounts) return
        query = `INSERT INTO "like_article" (articleId, userId) values (${postData.articleId},${userId});`
    } else {
        query = `DELETE FROM "like_article" WHERE articleId = ${postData.articleId} AND userId = ${userId};`
    }
    executeQuery(query)
}
async function likeComment(postData, userId) {
    let query
    if (postData.status) {
        query = `SELECT * FROM "like_comment" WHERE articleId = ${postData.commentId} AND userId = ${userId}`
        if(resultCounter(query)) return
        query = `INSERT INTO "like_comment" (commentId, userId) values (${postData.commentId},${userId});`
    } else {
        query = `DELETE FROM "like_comment" WHERE commentId = ${postData.commentId} AND userId = ${userId};`
    }
    executeQuery(query)
}
module.exports = { likeArticle, likeComment }