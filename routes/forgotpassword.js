const express = require('express');

const router = express.Router();

const passwordController = require('../controllers/forgotpassword');

router.post('/password/forgotpassword', passwordController.forgotpassword);

module.exports = router