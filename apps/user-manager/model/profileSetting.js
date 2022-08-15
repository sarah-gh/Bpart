const { executeQuery } = require('../../../services/queryExecutor')
const c = require('../../../config')
const fs = require('fs')

async function readProfileSetting(profileId) {
    query = `SELECT * FROM "user" where "user".userId = ${profileId}`
    const response = await executeQuery(query);
    return response.rows;
}

async function updateProfileSetting(data, userId){
    let query = `UPDATE "user" SET `;
    for (let key in data.update){
        if (key != "userPhoto"){
            query+= `${key} = '${data.update[key]}',`
        }else{
            photoAddress = await saveImage(data.update[key])
            query += `${key} = '${photoAddress}',`
        }
    }
    query = query.slice(0, -1) + ` WHERE "user".userId = ${userId};`;
    await executeQuery(query);
}

function saveImage(base64, userId) {
    const exname = base64.replace('data:image/', '').split(';')[0];
    var base64Data = base64.replace(`data:image/${exname};base64,`, "");
    const name = `${userId}.${exname}`
    fs.writeFileSync(`../../public/images/posts/${name}`, base64Data, "base64" );
    return `http://${c.env.HOST}:${c.env.PORT}/api/images/authors/${name}`
}
module.exports = { readProfileSetting, updateProfileSetting }