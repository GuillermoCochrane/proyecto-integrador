const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//Users Routes

//All Users
router.get('/',userController.index);

//User Login
router.get('/login', userController.login);

//User Register
router.get('/register', userController.register);

//User detailed info
router.get("/:id", userController.detail)

module.exports = router