
const {userLogin} = require('./controllers/auth')

const express = require('express');
const router = express.Router();

router.post('/api/login', userLogin);

module.exports = router;
