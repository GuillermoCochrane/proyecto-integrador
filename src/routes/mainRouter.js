const express = require('express');
const router = express.Router();
const mainController = require("../controllers/mainController")

//rutas 

router.get('/', mainController.index);

router.post('/', mainController.redirect);

router.post('/register', mainController.redirect);

module.exports = router