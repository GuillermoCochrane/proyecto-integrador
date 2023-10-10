const express = require('express');
const router = express.Router();
const productsController = require("../controllers/productsController")

//Products Routes

//All Products
router.get('/', productsController.index)
router.get("/category",productsController.index)
router.get("/status",productsController.index)

//product not found
router.get('/notFound',productsController.productNotFound)

//Product by Category
router.get("/category/:idCat",productsController.category)

//Product by status
router.get("/status/:idStatus",productsController.status)

//Create Products
router.get("/create",productsController.create)
router.post("/create",productsController.store)

//Edit Products
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.update); 

//Product delete
router.get('/delete/:id', productsController.delete);
router.delete('/delete/:id', productsController.destroy); 

//Product detail
router.get("/:id/", productsController.detail)

module.exports = router