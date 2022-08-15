const { executeQuery } = require('../../../../services/queryExecutor')
const c = require('../../../../config')
const fs = require('fs')

async function addArticle(postData, userId) {
    let query = `
        INSERT INTO "article" (userid, title, artcletext, date, readTime) 
            VALUES
        (
            ${userId},
            '${postData.title}',
            '${postData.articleText}',
            '${postData.date}',
            ${postData.readTime}
        )
        RETURNING *;
    `;
    const article = await executeQuery(query);
    const articleId = article.rows[0].articleid;

    // add article photos
    let fileName;
    let headerPhoto;
    let footerPhoto = null;

    if (postData.headerPhoto) {
        let fileName = `${articleId}_header.png`;
        await saveImage(postData.headerPhoto, fileName);
        headerPhoto = `'http://${c.env.HOST}:${c.env.PORT}/api/images/posts/${articleId}_header.png'`
    }
    if (postData.footerPhoto) {
        fileName = `${articleId}_footer.png`;
        await saveImage(postData.footerPhoto, fileName);
        footerPhoto = `'http://${c.env.HOST}:${c.env.PORT}/api/images/posts/${articleId}_footer.png'`
    }
    query = `
    UPDATE "article" 
    SET 
        headerPhoto = ${headerPhoto},
        footerPhoto = ${footerPhoto}
    WHERE articleId = ${articleId};
`
    await executeQuery(query);
    // add tags
    const tags = postData.tag;
    query = "";
    for (tag of tags) {
        query += `
            INSERT INTO "tag" (articleid, tagName) VALUES
            (${articleId}, '${tag}');
        `;
    }
    await executeQuery(query);
}

module.exports = { addArticle }

function saveImage(base64, name) {
    var base64Data = base64.replace(/^data:image\/png;base64,/, "");
    fs.writeFileSync(`../../public/images/posts/${name}`, base64Data, "base64" );
}