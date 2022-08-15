const { executeQuery } = require('../../../services/queryExecutor')
const { removeDuplicates } = require('../utils/removeDuplicates')
async function searchUsers(searchQuery, userId) {
    let results = []
    const statement = searchQuery.split(' ');
    for (word of statement) {
        const query = `
        SELECT distinct
        (
            select count(*) 
            from "follow" as ff2 
            where  ff1.followerid = ff2.followingid
            and ff2.followerid = ${userId}
        ) as areWeFollowing ,"user".userId, "user".fname, "user".lname, "user".userphoto, "user".description
            FROM "follow" as ff1 
            left join "user" on "user".userid = ff1."followerid"   
            where "user".fname LIKE '${word}' OR "user".lname LIKE '${word}' AND "user".userId != ${userId};
        `;
        const response = await executeQuery(query);
        results = results.concat(response.rows);
    }
    return removeDuplicates(results)
}

module.exports = { searchUsers }