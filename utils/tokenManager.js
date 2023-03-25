const c = require('../config')
const { TokenManager } = require('pioneers-token-manager')

const { verifyToken, generateToken } = new TokenManager(c.tokenConfig)

function verifyToken2 (req, res) {
    if(req.headers.token){
        let verify = verifyToken(req, res)
        req.user = verify
    }
}

module.exports = {
    verifyToken: verifyToken2,
    generateToken,
}