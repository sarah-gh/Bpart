const crypto = require('crypto')

function hashPassword(password) {
    return crypto.createHash('sha512').update(password, 'utf8').digest('hex');
}

module.exports = { hashPassword }