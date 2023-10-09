const express = require('express');
const router = express.Router();
const productsController = require("../controllers/productsController")


//Products Routes

//All Products
router.get('/', productsController.index)

//Create Products
router.get("/create",productsController.create)
router.post("/create",productsController.store)

//Product detail
router.get("/:id/", productsController.detail)

//Edit Products
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.update); 


module.exports = router