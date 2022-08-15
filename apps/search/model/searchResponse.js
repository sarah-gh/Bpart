const { executeQuery } = require('../../../services/queryExecutor');
const { searchPosts } = require('./searchPosts');
const { searchTags } = require('./searchTag');
const { searchUsers } = require('./searchUser');
async function searchQuery(query, userId) {
    const searchResponse = {};
    try{
        const posts = await searchPosts(query, userId);
        searchResponse.posts = posts;
        const tags = await searchTags(query, userId);
        searchResponse.tags = tags;
        const users = await searchUsers(query, userId);
        searchResponse.users = users;
        return searchResponse;
    }catch(err){
        return Promise.reject(err)
    }
}

module.exports = { searchQuery }