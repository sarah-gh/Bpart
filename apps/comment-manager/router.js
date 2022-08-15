
const { getComments } = require('./controllers/comments')
const dataParser = require('pionners-dataparser')
const { verifyToken } = require('../../utils/tokenManager')

module.exports.routes = {
  '/api/comments/:postId': {
    GET: {
      function: getComments,
      middlewares: [dataParser, verifyToken]
    }
  }
};