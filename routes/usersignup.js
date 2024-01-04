const express = require('express');

const router = express.Router();

const ExpenseTrackerController = require('../controllers/usersignup');

router.post('/user/signup', ExpenseTrackerController.createUser);

// router.get('/posts', postController.getPosts);

// router.get('/posts/:postId/comments', postController.getPostWithComments);

module.exports = router