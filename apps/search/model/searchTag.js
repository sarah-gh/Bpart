const { executeQuery } = require('../../../services/queryExecutor')
const { removeDuplicates } = require('../utils/removeDuplicates')

async function searchTags(searchQuery, userId) {
    let results = []
    const statement = searchQuery.split(' ');
    for (word of statement) {
        // const query = `
        //     SELECT distinct tagName FROM "tag" WHERE
        //         "tag".tagName LIKE '${word}';
        // `
        // const query = `
        //     SELECT DISTINCT "article".*
        //     FROM "article"
        //     INNER JOIN "tag" ON "article".articleId = "tag".articleId
        //     WHERE "tag".tagName LIKE '${word}';
        // `;
        const query = `
            SELECT
                (SELECT COUNT(*) FROM "save" WHERE "article".articleId = "save".articleid AND "save".userid = ${userId}) AS isSaved,
                (SELECT COUNT(*) FROM "follow" WHERE "follow".followingid = "article".userId AND "follow".followerid = ${userId}) AS isFollowing,
                "user".userId,
                "user".fname,
                "user".lname,
                "user".userPhoto,
                article.articleId,
                article.headerPhoto,
                article.title,
                article.articleText,
                article.footerPhoto,
                article.date,
                article.readTime
            FROM article
            LEFT JOIN "user"
                ON article.userId = "user".userId
            INNER JOIN "tag"
                ON article.articleId = "tag".articleId
            WHERE  "tag".tagName LIKE '${word}';
        `
        const response = await executeQuery(query);
        results = results.concat(response.rows);
    }
    const posts = results;
    for await (let element of posts) {
        query = `SELECT "tag".tagName from "tag" WHERE "tag".articleId = ${element.articleid}`
        results = await executeQuery(query);
        const tagList = [];
        const tags = results.rows;
        for (let tag of tags){
            tagList.push(tag.tagname)
        }
        element.tag = tagList
    }
    // tags = removeDuplicates(results);
    // const tagList = []
    // for (tag of tags) {
    //     tagList.push(tag.tagname);
    // }
    return posts;
}

module.exports = { searchTags }