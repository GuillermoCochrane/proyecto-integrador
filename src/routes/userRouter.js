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
router.post("/register", userController.store);

//Edit User
router.get('/edit/:id', userController.edit); 
router.put('/edit/:id', userController.update); 

//User detailed info
router.get("/:id", userController.detail)

module.exports = router