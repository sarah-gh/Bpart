const c = require('../config')
const { TokenManager } = require('pioneers-token-manager')

const { verifyToken, generateToken } = new TokenManager(c.tokenConfig)

module.exports = {
    verifyToken,
    generateToken,
}