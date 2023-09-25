const express = require('express');
const router = express.Router();
const path = require('path');

const mainRouter = require("../controllers/mainController");

//rutas 

router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,"../views/home.html"))
});

router.post('/', (req,res) => {
    res.redirect('/');
});

router.post('/register', (req,res) => {
    res.redirect('/')
});

module.exports = router