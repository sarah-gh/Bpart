const { executeQuery } = require('../../../services/queryExecutor')
const { removeDuplicates } = require('../utils/removeDuplicates')

async function searchTags(searchQuery, userId) {
    let results = []
    const statement = searchQuery.split(' ');
    for (word of statement) {
        const query = `
            SELECT distinct tagName FROM "tag" WHERE
                "tag".tagName LIKE '${word}';
        `
        const response = await executeQuery(query);
        results = results.concat(response.rows);
    }
    tags = removeDuplicates(results);
    const tagList = []
    for (tag of tags) {
        tagList.push(tag.tagname);
    }
    return tagList;
}

module.exports = { searchTags }