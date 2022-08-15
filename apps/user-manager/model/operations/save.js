const { executeQuery } = require('../../../../services/queryExecutor')
const { resultCounter } = require('../../../../services/countResults')

async function savePost(postData, userId) {
    let query
    if (postData.status) {
        query = `SELECT * FROM "save" WHERE articleId = '${postData.articleId}' AND userId = '${userId}';`
        if(await resultCounter(query)) return
        query = `INSERT INTO "save" (articleId, userId) VALUES (${postData.articleId},${userId});`
    } else {
        query = `DELETE FROM "save" WHERE userId = ${userId} and articleId = ${postData.articleId};`
    }
    executeQuery(query)
}

module.exports = { savePost }
