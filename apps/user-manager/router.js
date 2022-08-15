const { getProfileById } = require('./controllers/userProfile')
const { getUserInfo, postUserInfo } = require('./controllers/userSetting')
const { getSavedMessages } = require('./controllers/savedMessages')
const { operationRegister } = require('./controllers/operation')
const { userRegister } = require('./controllers/userRegister')
const { getCsrfToken } = require('./controllers/csrfToken')

const express = require('express');
const router = express.Router();

router.post('/api/register', userRegister);
router.post('/api/users/operation', operationRegister);
router.get('/api/users/profile/:userId', getProfileById);
router.get('/api/users/profile', getProfileById);

router.get('/api/users/profileSetting', getUserInfo);
router.post('/api/users/profileSetting', postUserInfo);
router.get('/api/users/savedMessages', getSavedMessages);
router.get('/api/users/csrf', getCsrfToken);

module.exports = router;
