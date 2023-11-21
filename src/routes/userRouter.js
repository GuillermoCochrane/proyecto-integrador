const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
//Middlewares
const upload = require("../middlewares/usersMulterMDW");
const userValidations = require("../middlewares/userValidationsMDW");
const loginValidations = require("../middlewares/loginValidationsMDW");
//Users Routes

//All Users
router.get('/',userController.index);

//product not found
router.get('/notFound',userController.userNotFound)

//User Login
router.get('/login', userController.login);
router.post('/login', loginValidations, userController.processLogin)

//User Profile
router.get("/profile", userController.profile)

//User Logout
router.get("/logout", userController.logout)

//User test sessions
router.get("/test", userController.test)


//User Register
router.get('/register', userController.register);
router.post("/register",upload.single("photo"), userValidations, userController.store);

//Edit User
router.get('/edit/:id', userController.edit); 
router.put('/edit/:id',upload.single("photo"), userValidations, userController.update); 

//Delete User
router.get('/delete/:id', userController.delete);
router.delete('/delete/:id', userController.destroy)

//User detailed info
router.get("/:id", userController.detail)

module.exports = router