const express = require('express');
const router = express.Router();
const productsController = require("../controllers/productsController");

//Middlewares
const upload = require("../middlewares/productsMulterMDW");
const viewsCounter = require("../middlewares/productViewsCounterMDW");
const productValidations = require("../middlewares/productValidationsMDW");
const adminMDW = require("../middlewares/adminMDW");

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
router.get("/create", adminMDW, productsController.create)
router.post("/create",upload.single("img"), productValidations, productsController.store)

//Edit Products
router.get('/edit/:id', adminMDW, productsController.edit); 
router.put('/edit/:id', upload.single("img"), productValidations, productsController.update); 

//Product delete
router.get('/delete/:id', adminMDW, productsController.delete);
router.delete('/delete/:id', productsController.destroy); 

//Product detail
router.get("/:id/", viewsCounter, productsController.detail)

module.exports = router