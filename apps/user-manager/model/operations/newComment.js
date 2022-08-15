const { executeQuery } = require('../../../../services/queryExecutor')

async function addComment(postData, userId) {
    let query = `
        INSERT INTO "comment" (userid, articleid, commentText, replyto, commentDate) 
            VALUES
        (
            ${userId},
            ${postData.articleId},
            '${postData.text}',
            ${postData.replyto},
            '${postData.date}'
        );
    `;
    await executeQuery(query)
}
module.exports = { addComment }
