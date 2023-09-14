const { executeQuery } = require('../../../services/queryExecutor')
const { removeDuplicates } = require('../utils/removeDuplicates')
async function searchUsers(searchQuery, userId) {
    let results = []
    const statement = searchQuery.split(' ');
    for (word of statement) {
        const query = `
            SELECT * FROM "user" WHERE "user".fname LIKE '${word}' OR "user".lname LIKE '${word}' AND "user".userId != ${userId};
        `
        const response = await executeQuery(query);
        results = results.concat(response.rows);
    }
    return removeDuplicates(results)
}

module.exports = { searchUsers }