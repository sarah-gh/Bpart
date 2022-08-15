const { executeQuery } = require('../../../services/queryExecutor')

async function getUserDataByUsername(username) {
    const query = `SELECT * FROM "user" WHERE "user".username = '${username}';`;
    const response = await executeQuery(query)
    return response.rows[0]
}
module.exports = { getUserDataByUsername }