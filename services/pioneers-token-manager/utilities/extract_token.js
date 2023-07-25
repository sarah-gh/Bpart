const extractToken = (req) => {
    if (req.headers.token) {
        return req.headers.token;
    }
    return null;
}

module.exports = { extractToken }
