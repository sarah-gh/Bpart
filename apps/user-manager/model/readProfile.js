const { readPosts } = require('./readPosts')
const { readProfileSetting } = require('./profileSetting')
const { readFollowers } = require('./readFollows')
const { resultCounter } = require('../../../services/countResults')

async function readProfile(userId, profileId, postLimit) {
    const response = {};
    // console.log('readProfile');
    // console.log(userId, profileId, postLimit);
    let about = await readProfileSetting(profileId);
    // delete about[0]?.password;
    response.about = about;
    const posts = await readPosts(`"article".userId = ${profileId}`, postLimit, userId);
    response.posts = posts;
    const follows = await readFollowers(userId, profileId);
    response.follows = follows;
    response.about[0].followers = follows.length;
    const isFollowing = await isFollowingByUser(userId, profileId)
    // console.log(4);
    response.about[0].isFollowing = isFollowing;
    return response;
}

async function isFollowingByUser(userId, profileId){
    const query = `
        SELECT * FROM "follow" 
        WHERE "follow".followerId = ${userId} AND "follow".followingId = ${profileId};`;
    return await resultCounter(query)
}

module.exports = { readProfile }