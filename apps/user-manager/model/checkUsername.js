const { executeQuery } = require('../../../services/queryExecutor')
async function isUsernameAvailable(username) {
    // console.log(username);
    const query = `SELECT * FROM "user" WHERE "user".username = '${username}';`
    const res = await executeQuery(query);
    // console.log(res.rowCount);
    if (res.rowCount === 0) return true;
    return false;
}

module.exports = {isUsernameAvailable}
