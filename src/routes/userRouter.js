const express = require('express');
const router = express.Router();
const path = require('path');

const userRouter = require("../controllers/userController");
const userController = require('../controllers/userController');

router.get('/login', userRouter.login);

router.get('/register', userController.register);



module.exports = router