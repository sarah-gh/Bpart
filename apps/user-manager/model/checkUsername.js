const { executeQuery } = require('../../../services/queryExecutor')
async function isUsernameAvailable(username) {
    const query = `SELECT * FROM "user" WHERE "user".username = '${username}';`
    const res = await executeQuery(query);
    if (res.rowCount === 0) return true;
    return false;
}

module.exports = {isUsernameAvailable}
