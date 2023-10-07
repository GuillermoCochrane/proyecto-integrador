const express = require('express');
const router = express.Router();
const productsController = require("../controllers/productsController")


//Products Routes

//All Products
router.get('/', productsController.index)

//Product detail
router.get("/:id/", productsController.detail)

module.exports = router