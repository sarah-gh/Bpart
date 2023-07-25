const c = require('./config')
const jwt = require('jsonwebtoken');
const { extractToken } = require('./utilities/extract_token')

class TokenManager {
    constructor(config) {
        this.tokenKey = config.tokenKey;
        this.expireTime = config.expireTime;
    }
    verifyToken = (req, res) => {
        const token = extractToken(req);
        if (token) {
            try {
                const decoded = jwt.verify(token, this.tokenKey);
                req.user = decoded;
                return decoded
            } catch (err) {
                res.statusCode = c.statusCode.UNAUTHORIZED;
                res.setHeader('Content-Type', c.contentTypes.JSON);
                res.end({ message: c.errors.UNAUTHORIZED.message });
                return
            }
            // return next();
        }
    }

    generateToken = (payload) => {
        const tokenKey = this.tokenKey;
        const expireTime = this.expireTime;

        const token = jwt.sign(
            payload,
            tokenKey,
            {
                expiresIn: expireTime
            }
        );
        return token;
    }
}

module.exports = { TokenManager }