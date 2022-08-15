const { executeQuery } = require('../../../services/queryExecutor')
const { removeDuplicates } = require('../utils/removeDuplicates')
async function searchPosts(searchQuery, userId) {
    let results = []
    const statement = searchQuery.split(' ');
    for (word of statement) {
        const query = `SELECT
                (select count(*) from "save" where "article".articleId = "save".articleid and "save".userid = ${userId} ) as isSaved,
                (select count(*) from "follow" where "follow".followingid = "article".userId and "follow".followerid = ${userId} ) as isFollowing,
                "user".userId,
                "user".fname, 
                "user".lname, 
                "user".userPhoto,
                article.articleId, 
                article.headerPhoto, 
                article.title, 
                article.artcleText,
                article.footerPhoto,
                article.date,
                article.readTime 
            FROM article
            LEFT JOIN "user"
                ON article.userId = "user".userId
            WHERE ("article".artcleText LIKE '%${word}%' AND "article".userid != ${userId}) OR 
            ("article".title LIKE '%${word}%' AND "article".userid != ${userId});
            `
        const response = await executeQuery(query);
        results = results.concat(response.rows);
        return removeDuplicates(results)
    }
}
module.exports = { searchPosts }