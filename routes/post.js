const express = require('express');

const router = express.Router();

const postController = require('../controllers/post');

router.post('/posts', postController.createPost);

router.get('/posts', postController.getPosts);

router.get('/posts/:postId/comments', postController.getPostWithComments);

module.exports = router