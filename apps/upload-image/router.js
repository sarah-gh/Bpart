
const { getPhoto } = require('./controllers/images')
const dataParser = require('pionners-dataparser')
process.chdir(__dirname)

module.exports.routes = {
  '/api/images': {
    GET: {
      function: getPhoto,
      middlewares: [dataParser]
    }
  }
};