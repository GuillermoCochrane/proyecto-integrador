const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
//Middlewares
const loggedMDW = require("../middlewares/loggedMDW")
const guestMDW = require("../middlewares/guestMDW")
const upload = require("../middlewares/usersMulterMDW");
const userValidations = require("../middlewares/userValidationsMDW");
const loginValidations = require("../middlewares/loginValidationsMDW");
//Users Routes

//All Users
router.get('/',userController.index);

//User not found
router.get('/notFound',userController.userNotFound)

//User Login
router.get('/login', guestMDW, userController.login);
router.post('/login', loginValidations, userController.processLogin)

//User Profile
router.get("/profile", loggedMDW, userController.profile)

//User Logout
router.get("/logout", loggedMDW, userController.logout)

//User test sessions
router.get("/test", userController.test)

//User Register
router.get('/register', guestMDW, userController.register);
router.post("/register",upload.single("photo"), userValidations, userController.store);

//Edit User
router.get('/edit/:id', loggedMDW, userController.edit); 
router.put('/edit/:id',upload.single("photo"), userValidations, userController.update); 

//edit profile

//change password
router.put('/password', /* userValidations  modificar */ userController.changePassword);
//change avatar
router.put('/avatar', /*upload.single("photo"), userValidations  modificar */ userController.changeAvatar); 
//Edit user Data
router.put('/editdata', /* userValidations  modificar */ userController.updateData); 


//Delete User
router.get('/delete/:id', loggedMDW, userController.delete);
router.delete('/delete/:id', userController.destroy)

//User detailed info
router.get("/:id", loggedMDW, userController.detail)

module.exports = router