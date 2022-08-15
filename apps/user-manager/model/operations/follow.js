const { executeQuery } = require('../../../../services/queryExecutor')
const { resultCounter } = require('../../../../services/countResults')

async function follow(postData, userId) {
    let query
    if (postData.status) {
        query = `SELECT * FROM "follow" WHERE followingid = ${postData.followingId} AND followerid = ${userId};`;
        if (await resultCounter(query)) return;
        query = `INSERT INTO "follow" (followerid, followingid) VALUES (${userId},${postData.followingId});`;
    } else {
        query = `DELETE FROM "follow" WHERE followerid = ${userId} and followingid = ${postData.followingId};`;
    }
    executeQuery(query);
}

module.exports = { follow }