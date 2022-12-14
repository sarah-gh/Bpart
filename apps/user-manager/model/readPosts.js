const { executeQuery } = require('../../../services/queryExecutor')
async function readPosts(condition, limit, userId) {
    let query = `
            SELECT
                (select count(*) from "save" where "article".articleId = "save".articleid and "save".userid = ${userId} ) as isSaved,
                (select count(*) from "follow" where "follow".followingid = "article".userId and "follow".followerid = ${userId} ) as isFollowing,
                (select count(*) from "like_article" where "like_article".articleId = "article".userId and "like_article".userId = ${userId} ) as isLiked,
                (select count(*) from "like_article" where "like_article".articleId = "article".articleId) as likeCount,
                (select count(*) from "comment" where "comment".articleId = "article".articleId) as commentcount,
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
                ON "article".userId = "user".userId
            WHERE ${condition} ORDER BY "article".articleId DESC limit ${limit} ;`
    let Results = await executeQuery(query);
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
    return posts
}
module.exports = { readPosts }