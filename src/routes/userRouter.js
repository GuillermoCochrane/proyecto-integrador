const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const userController = require('../controllers/userController');


//Multer config

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, "../../public/images/users"))
    },
    filename: function(req,file, cb){
        let newFileName = "user" + Date.now() + path.extname(file.originalname)
        cb(null, newFileName)
    }
})

const upload = multer({storage})

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
router.post("/register",upload.single("photo"), userController.store);

//Edit User
router.get('/edit/:id', userController.edit); 
router.put('/edit/:id',upload.single("photo"), userController.update); 

//Delete User
router.get('/delete/:id', userController.delete);
router.delete('/delete/:id', userController.destroy)

//User detailed info
router.get("/:id", userController.detail)

module.exports = router