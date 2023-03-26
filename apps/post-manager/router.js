
const { getPosts, getSinglePost, getFollowingPosts } = require('./controllers/posts')
const express = require('express');
const router = express.Router();

router.get('/api/post', getSinglePost);
router.get('/api/posts', getPosts);
router.get('/api/followingPosts', getFollowingPosts);

module.exports = router;
