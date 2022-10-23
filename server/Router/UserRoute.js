const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');



router.get('/customer', userController.getListUser);
router.get('/admin', userController.userDetail);


module.exports = router;