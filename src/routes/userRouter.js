const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
//Middlewares
const loggedMDW = require("../middlewares/loggedMDW")
const guestMDW = require("../middlewares/guestMDW")
const upload = require("../middlewares/usersMulterMDW");
const userValidations = require("../middlewares/userValidationsMDW");
const passwordValidations = require("../middlewares/userPasswordValidationsMDW");
const avatarValidations = require("../middlewares/userAvatarValidationsMDW");
const loginValidations = require("../middlewares/loginValidationsMDW");
const recoveryMailValidation = require("../middlewares/mailPasswordValidationsMDW")
const mailUsernameValidations = require("../middlewares/userMailUsernameValidationsMDW")
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
router.post("/register",upload.single("avatar"), mailUsernameValidations, passwordValidations, userController.store);

//Edit User
router.get('/edit/:id', loggedMDW, userController.edit); 
router.put('/edit/:id',upload.single("avatar"), userValidations, mailUsernameValidations, avatarValidations, passwordValidations, userController.update); 

//edit profile:

//change password
router.put('/password', passwordValidations, userController.changePassword);
//change avatar
router.put('/avatar', upload.single("avatar"), avatarValidations, userController.changeAvatar); 
//Edit user Data
router.put('/editdata', userValidations, userController.updateData); 

//Recover Password
router.get('/recovery', userController.recover);
router.post('/recovery', userController.processRecovery);
router.put('/newPassword', passwordValidations, recoveryMailValidation, userController.replacePassword);

//Delete User
router.get('/delete/:id', loggedMDW, userController.delete);
router.delete('/delete/:id', userController.destroy)

//User detailed info
router.get("/:id", loggedMDW, userController.detail)

module.exports = router