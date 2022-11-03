const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');



router.get('/user', userController.getListUser);



module.exports = router;