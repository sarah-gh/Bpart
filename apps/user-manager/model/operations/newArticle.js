const { executeQuery } = require('../../../../services/queryExecutor')
const c = require('../../../../config')
const fs = require('fs')

async function addArticle(postData, userId) {
    try {
        let query = `
            INSERT INTO "article" (userid, title, articletext, date, readTime) 
                VALUES
            (
                ${userId},
                '${postData.title}',
                '${postData.articletext}',
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
        let pdfFile = null;

        if (postData.headerPhoto) {
            let fileName = `${articleId}_header.jpg`;
            await saveImage(postData.headerPhoto, fileName);
            headerPhoto = `'http://${c.env.HOST}:${c.env.PORT}/api/images/posts/${fileName}'`
        }
        if (postData.footerPhoto) {
            fileName = `${articleId}_footer.jpg`;
            await saveImage(postData.footerPhoto, fileName);
            footerPhoto = `'http://${c.env.HOST}:${c.env.PORT}/api/images/posts/${fileName}'`
        }
        if (postData.pdfFile) {
            fileName = `${articleId}_file.pdf`;
            await saveFile(postData.pdfFile, fileName);
            pdfFile = `'http://${c.env.HOST}:${c.env.PORT}/api/images/posts/${fileName}'`
        }
        if(headerPhoto || footerPhoto) {
            query = `
                UPDATE "article" 
                SET 
                    headerPhoto = ${headerPhoto},
                    footerPhoto = ${footerPhoto},
                    pdfFile = ${pdfFile}
                WHERE articleId = ${articleId};
            `
            await executeQuery(query);
        }
        
        // add tags
        const tags = postData.tag;
        query = "";
        for (let tag of tags) {
            query += `
                INSERT INTO "tag" (articleid, tagName) VALUES
                (${articleId}, '${tag}');
            `;
        }
        await executeQuery(query);
    } catch (error) {
        console.log(error);
        throw error
    }
    
}

module.exports = { addArticle }

function saveImage(base64, name) {
    // const base64Data = base64.replace(/^data:image\/jpg;base64,/, "");
    // fs.writeFileSync(`../../public/images/posts/${name}`, base64Data, "base64" );
    var data = base64.replace(/^data:image\/\w+;base64,/, "");
    var buf = Buffer.from(data, 'base64');
    fs.writeFileSync(`../../public/images/posts/${name}`, buf, /* callback will go here */);
}

function saveFile(base64, name) {
    var data = base64.replace(/^data:application\/\w+;base64,/, "");
    var buf = Buffer.from(data, 'base64');
    fs.writeFileSync(`../../public/images/posts/${name}`, buf, /* callback will go here */);


    // const base64Data = new Buffer.from(
    //     base64.fileData.substring(base64.fileData.indexOf("base64") + 7),
    //     "base64"
    // );
    // fs.writeFileSync(`../../public/images/posts/${name}`, base64Data);
}