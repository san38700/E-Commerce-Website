const express = require('express');

const router = express.Router();

const reviewController = require('../controllers/review');

router.post('/review/add-review',reviewController.addReview)

router.get('/review/get-review/:companyName',reviewController.getReview)

// router.delete('/user/delete-user/:id',userController.deleteUser)

// router.delete('/user/edit-user/:id',userController.editUser)

module.exports = router