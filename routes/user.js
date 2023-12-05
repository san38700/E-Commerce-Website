const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.post('/user/add-user',userController.addUser)

router.get('/user/get-users',userController.getUser)

router.delete('/user/delete-user/:id',userController.deleteUser)

router.delete('/user/edit-user/:id',userController.editUser)

module.exports = router