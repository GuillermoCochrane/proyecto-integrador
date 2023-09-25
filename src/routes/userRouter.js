const express = require('express');
const router = express.Router();
const path = require('path');

const userRouter = require("../controllers/userController");

router.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname,"../views/login.html"))
});

router.get('/register', (req,res) => {
    res.sendFile(path.join(__dirname,"../views/register.html"))
});



module.exports = router