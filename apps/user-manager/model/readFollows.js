const { executeQuery } = require('../../../services/queryExecutor')
function readFollowers(userId, profileId) {
    return new Promise((resolve, reject) => {
        query = `
        SELECT ff1.followerid as followerid,
        (
            select count(*) 
            from "follow" as ff2 
            where  ff1.followerid = ff2.followingid
            and ff2.followerid = ${userId}
        ) as isFollowing ,"user".fname, "user".lname, "user".userphoto, "user".shortdescription
            FROM "follow" as ff1 
            left join "user" on "user".userid = ff1."followerid"   
            where ff1.followingid = ${profileId};
        `;
        executeQuery(query)
            .then(res => {
                resolve(res.rows);
            })
            .catch(err => {
                reject(err);
            })
    });
}

module.exports = { readFollowers }