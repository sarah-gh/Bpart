
const {userLogin} = require('./controllers/auth-copy')

const express = require('express');
const router = express.Router();

router.post('/api/login', userLogin);

module.exports = router;
