const express = require('express');
const router = express.Router();
const productsController = require("../controllers/productsController")


// Rutas de productos

//Todos los productos
router.get('/', productsController.index)

module.exports = router