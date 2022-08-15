const { executeQuery } = require('../../../services/queryExecutor')
const { resultCounter } = require('../../../services/countResults')

async function generateCsrfToken(userId) {
    const token = generateRandomToken();
    let query = `SELECT * FROM "csrf" WHERE userId = ${userId}`
    if (await resultCounter(query)) {
        query = `UPDATE "csrf" SET token = '${token}' WHERE userId = ${userId}`;
    } else {
        query = `INSERT INTO "csrf" (userId, token) VALUES (${userId}, '${token}')`;
    }
    await executeQuery(query);
    return { csrfToken: token };
}

function generateRandomToken(len = 200) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const charLength = chars.length;
    let token = '';
    for (let i = 0; i < len; i++) {
        randChar = chars[Math.floor(Math.random() * charLength)]
        token += randChar;
    }
    return token;
}

module.exports = { generateCsrfToken }