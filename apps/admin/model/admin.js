const { executeQuery } = require('../../../services/queryExecutor')

async function deleteArticle(articleId) {
    try {
        // ابتدا بررسی می‌کنیم که مقاله با مالک مطابقت دارد یا خیر
        const checkOwnershipQuery = `
            SELECT userid FROM "article" WHERE articleId = ${articleId};
        `;
        const result = await executeQuery(checkOwnershipQuery);

        if (result.rows.length === 0) {
            throw new Error('مقاله مورد نظر یافت نشد');
        }

        const articleOwnerId = result.rows[0].userid;

        // اگر مالک مقاله با یوزر ای دی ورودی مطابقت داشته باشد، مقاله حذف می‌شود
        const deleteSaveQuery = `
                DELETE FROM "save" WHERE articleid = ${articleId};
            `;
        await executeQuery(deleteSaveQuery);

        const deleteCommentQuery = `
                DELETE FROM "comment" WHERE articleid = ${articleId};
            `;
        await executeQuery(deleteCommentQuery);

        const deleteLikeArticleQuery = `
                DELETE FROM "like_article" WHERE articleid = ${articleId};
            `;
        await executeQuery(deleteLikeArticleQuery);

        const deleteDownloadArticleQuery = `
                DELETE FROM "download" WHERE articleid = ${articleId};
            `;
        await executeQuery(deleteDownloadArticleQuery);

        // در نهایت، تگ‌های مربوط به مقاله از جدول tag حذف می‌شوند
        const deleteTagsQuery = `
                DELETE FROM "tag" WHERE articleid = ${articleId};
            `;
        await executeQuery(deleteTagsQuery);

        // سپس مقاله خود از جدول article حذف می‌شود
        const deleteArticleQuery = `
                DELETE FROM "article" WHERE articleid = ${articleId};
            `;
        await executeQuery(deleteArticleQuery);
        console.log('مقاله با تمام اطلاعات مرتبط حذف شد');
        return {}
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function blockingUser(userId) {
    try {
        const query = `UPDATE "user"
        SET blocked = TRUE
        WHERE userId = ${userId};
        `
        await executeQuery(query);
        return {}
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function unBlockingUser(userId) {
    try {
        const query = `UPDATE "user"
        SET blocked = FALSE
        WHERE userId = ${userId};
        `
        await executeQuery(query);
        return {}
    } catch (error) {
        console.error(error);
        throw error;
    }
    
}

async function commentDelete(id) {
    try {
        const query = `
            DELETE FROM "comment"
            WHERE commentId = ${id};
        `;
        const queryReplyTo = `
            DELETE FROM "comment"
            WHERE replyTo = ${id};
        `
        console.log(query);
        await executeQuery(queryReplyTo);
        await executeQuery(query);
        return {};
    } catch (error) {
        console.error(error);
        throw error;
    }
}


async function readPosts(condition, limit, userId) {
    try {
        // console.log('readPosts:', condition, limit, userId);
        let query = `
                SELECT
                    (select count(*) from "save" where "article".articleId = "save".articleid and "save".userid = ${userId} ) as isSaved,
                    (select count(*) from "save" where "article".articleId = "save".articleid ) as Saved,
                    (select count(*) from "follow" where "follow".followingid = "article".userId and "follow".followerid = ${userId} ) as isFollowing,
                    (select count(*) from "like_article" where "like_article".articleId = "article".userId and "like_article".userId = ${userId} ) as isLiked,
                    (select count(*) from "like_article" where "like_article".articleId = "article".userId ) as Liked,
                    (select count(*) from "like_article" where "like_article".articleId = "article".articleId),
                    (select count(*) from "comment" where "comment".articleId = "article".articleId),
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
            for (let tag of tags) {
                tagList.push(tag.tagname)
            }
            element.tag = tagList
            if (!(+element.ispaid) && userId !== element.userid) {
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

module.exports = { commentDelete, deleteArticle, blockingUser, unBlockingUser }