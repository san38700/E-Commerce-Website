const express = require('express');

const router = express.Router();

const passwordController = require('../controllers/forgotpassword');

router.post('/password/forgotpassword', passwordController.forgotpassword);

<<<<<<< HEAD
router.get('/password/resetpassword/:id',passwordController.resetpassword)

router.post('/password/newpassword',passwordController.newpassword)

=======
>>>>>>> 23bf860ab2e66eab9474fb74d5e8ec39b3105f59
module.exports = router