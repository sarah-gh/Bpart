
const { deleteComment, deletePost, blockUser, unBlockUser } = require('./controllers/admin')
const express = require('express');
const router = express.Router();

router.post('/api/admin/deleteComment', deleteComment);
router.get('/api/admin/deletePost', deletePost);
router.post('/api/admin/blockUser', blockUser);
router.post('/api/admin/unblockUser', unBlockUser);

module.exports = router;
