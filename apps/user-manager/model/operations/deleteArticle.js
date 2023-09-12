const { executeQuery } = require('../../../../services/queryExecutor');

async function deleteArticle(post, userId, role = 'user') {
    try {
        const articleId = post.id;

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
        if (articleOwnerId === userId || role == 'admin') {
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

        } else {
            throw new Error('شما اجازه حذف این مقاله را ندارید');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { deleteArticle };
