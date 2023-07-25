const queryString = require('querystring');
const c = require('./config');

async function Parser(req, res, next) {
    try {
        switch (req.method) {
            case "GET":
                break;
            case "POST":
            case "PUT":
                req.data = await getPostData(req);
                break;
        }
        next();
    }
    catch (e) {
        res.statusCode = c.statusCodes.INTERNAL_SERVER_ERROR;
        res.setHeader('Content-Type', c.contentTypes.JSON);
        console.log(`${c.errors.internalServerError.code}: ${c.errors.internalServerError.message}`);
        res.end(JSON.stringify(c.errors.internalServerError));
    }
}

async function getPostData(req) {
    let data = null;
    return new Promise((resolve, reject) => {
        let buffer = '';
        req.on('data', chunk => {
            buffer += chunk;
        });

        req.on('end', () => {
            try {
                data = JSON.parse(buffer);
            }
            catch (e) {
                data = buffer;
            }

            resolve(data);
        })
    });
}

module.exports = Parser;