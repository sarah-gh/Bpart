const { executeQuery } = require('../../../../services/queryExecutor')

async function addComment(postData, userId) {
    try {
        console.log('addComment');
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
        console.log('addComment query: ', query);
        await executeQuery(query)
    } catch (error) {
        console.log('error:: ', error);
        throw error;
    }
    
}
module.exports = { addComment }
