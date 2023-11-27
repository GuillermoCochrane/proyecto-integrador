const express = require('express');
const router = express.Router();
const cartController = require("../controllers/cartController");

//Middlewares

//Products Routes

//All Products
router.get('/', cartController.index)

//product not found
/* router.get('/notFound',cartController.productNotFound) */

//Add Products to cart
/* router.get("/create",cartController.create) */
router.post("/add/:id", cartController.add)

/* //Edit product in cart
router.get('/edit/:id', cartController.edit); 
router.put('/edit/:id', upload.single("img"), productValidations, cartController.update); 

//Product in cart delete
router.get('/delete/:id', cartController.delete);
router.delete('/delete/:id', cartController.destroy); 
 */
module.exports = router