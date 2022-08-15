
const { getPhoto } = require('./controllers/images')
// const dataParser = require('pionners-dataparser')
process.chdir(__dirname)

const express = require('express');
const router = express.Router();

router.get('/api/images/:x/:y', getPhoto);

module.exports = router;
