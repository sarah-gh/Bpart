
const { imageManager } = require('./controllers/images')
// const dataParser = require('pionners-dataparser')
process.chdir(__dirname)

const express = require('express');
const router = express.Router();
const manager = new imageManager

router.get('/api/images/:x/:y', manager.getPhoto);

module.exports = router;
