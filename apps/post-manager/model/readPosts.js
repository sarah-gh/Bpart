const {executeQuery} = require('../../../services/queryExecutor')
async function readPosts(condition, limit, userId) {
    try {
        // console.log('readPosts:', condition, limit, userId);
        let query = `
                SELECT
                    (select count(*) from "save" where "article".articleId = "save".articleid and "save".userid = ${userId} ) as isSaved,
                    (select count(*) from "save" where "article".articleId = "save".articleid ) as Saved,
                    (select count(*) from "follow" where "follow".followingid = "article".userId and "follow".followerid = ${userId} ) as isFollowing,
                    (select count(*) from "like_article" where "like_article".articleId = "article".articleId and "like_article".userId = ${userId} ) as isLiked,
                    (select count(*) from "like_article" where "like_article".articleId = "article".articleId) as Liked,
                    (select count(*) from "download" where "download".articleId = "article".articleId and "download".userId = ${userId} ) as isPaid,
                    "user".userId,
                    "user".fname, 
                    "user".lname, 
                    "user".userPhoto,
                    article.articleId, 
                    article.headerPhoto, 
                    article.pdffile,
                    article.title, 
                    article.articleText,
                    article.footerPhoto,
                    article.date,
                    article.readTime,
                    article.price 
                FROM article
                LEFT JOIN "user"
                    ON "article".userId = "user".userId
                WHERE ${condition} ORDER BY "article".articleId DESC limit ${limit} ;`
        let Results = await executeQuery(query);
        const posts = Results.rows;
        for await (let element of posts) {
            query = `SELECT "tag".tagName from "tag" WHERE "tag".articleId = ${element.articleid}`
            Results = await executeQuery(query);
            const tagList = [];
            const tags = Results.rows;
            for (let tag of tags){
                tagList.push(tag.tagname)
            }
            element.tag = tagList
            if (!(+element.ispaid) && userId!==element.userid) {
                // User has paid for the article
                element.pdffile = '';
            }
        }
        return posts
    } catch (error) {
        console.log(error);
        throw error;
    }
    
}
module.exports = { readPosts }