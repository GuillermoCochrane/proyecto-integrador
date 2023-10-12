const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//Users Routes

//All Users
router.get('/',userController.index);

//product not found
router.get('/notFound',userController.userNotFound)

//User Login
router.get('/login', userController.login);
router.post('/login', userController.processLogin)

//User Register
router.get('/register', userController.register);
router.post("/register", userController.store);

//Edit User
router.get('/edit/:id', userController.edit); 
router.put('/edit/:id', userController.update); 

//Delete User
router.get('/delete/:id', userController.delete);
router.delete('/delete/:id', userController.destroy)

//User detailed info
router.get("/:id", userController.detail)

module.exports = router