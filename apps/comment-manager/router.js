
const { getComments } = require('./controllers/comments')
const express = require('express');
const router = express.Router();

router.get('/api/comments/:postId', getComments);

module.exports = router;