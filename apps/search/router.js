
const dataParser = require('pionners-dataparser')
const {searchInputQuery} = require('./controllers/search')
const {verifyToken} = require('../../utils/tokenManager')

module.exports.routes = {
    '/api/search': {
        GET: {
            function: searchInputQuery,
            middlewares: [dataParser, verifyToken]
        }
    },
};