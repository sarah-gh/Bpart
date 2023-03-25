const c = require('../config');
const fs = require('fs');
const path = require('path');
const { queryStringValidate } = require('../../../utils/queryValidate')
const { sendFail } = require('../../../utils/response-handler')
process.chdir(__dirname)

function getPhoto(req, res) {
    const pathName = req.path.replace('/api/', '')
    const photoPath = `../../public/${pathName}`
    const extname = path.extname(photoPath).replace('.', '')
    try {
        const photo = fs.readFileSync(photoPath);
        res.statusCode = c.statusCodes.SUCCESS;
        // res.set({"Content-Type": `image/${extname}`})
        res.setHeader("Content-Type", `image/${extname}`)
        res.write(photo)
        res.end()
    } catch (e) {
        console.log(e)
        sendFail(res, c.statusCodes.NOT_FOUND, {message: c.errors.NOT_FOUND.message})
    }
}

module.exports = {
    getPhoto
}