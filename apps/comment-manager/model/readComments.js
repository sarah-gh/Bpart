const { executeQuery } = require('../../../services/queryExecutor')

async function readComments(articleId, limit) {
    const query = `
        SELECT
        "comment".commentId,
        "user".fname,
        "user".lname,
        "comment".commentText,
        "comment".replyTo,
        (select count(*) from "like_comment" where "comment".commentId = "like_comment".commentId) as countLike,
        "comment".commentDate
        FROM "comment"
        LEFT JOIN "user" on "user".userid = "comment".userid 
        WHERE articleId = ${articleId} limit ${limit};`;
    const response = await executeQuery(query)
    return commentFormatter(response.rows)
}
function commentFormatter(dataSet) {
    let data = dataSet.slice();
    const result = []
    for (item of data) {
        if (!item.replyto) {
            result.push(item)
            result[result.length - 1].replyComment = []
            data = data.filter(a => a != item)
        }
    }
    let refference
    for (item of data) {
        refference = findRefference(item, dataSet)
        for (i in result) {
            if (refference == result[i].commentid) {
                result[i].replyComment.push(item)
            }
        }
    }
    return result
}

function findRefference(item, data) {
    let ref = item.commentid
    while (true) {
        if (item.replyto) {
            ref = item.replyto
        }
        for (element of data) {
            if (element.commentid === ref) {
                if (!element.replyto)
                    return ref
                else
                    item = element
            }
        }
    }
}
module.exports = { readComments }
