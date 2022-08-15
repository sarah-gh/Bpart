const { executeQuery } = require('../../../services/queryExecutor')

async function readSavedMessages(userId, limit) {
    query = `
            SELECT 
                "user".userId,
                "user".fname, 
                "user".lname, 
                "user".userPhoto,
                article.articleId, 
                article.headerPhoto, 
                article.title, 
                article.artcleText,
                article.date,
                article.readTime
                FROM "article"
                LEFT JOIN "user" on "user".userid = "article".userid
                LEFT JOIN "save" on "article".articleid = "save".articleid
            where
            "save".userId = ${userId}
            LIMIT ${limit};
        `
    let Results = await executeQuery(query)
    const posts = Results.rows;
    for (element of posts) {
        query = `SELECT "tag".tagName from "tag" WHERE "tag".articleId = ${element.articleid}`
        Results = await executeQuery(query);
        const tagList = [];
        const tags = Results.rows;
        for (tag of tags) {
            tagList.push(tag.tagname)
        }
        element.tag = tagList
    }
    return posts;
}

module.exports = { readSavedMessages }