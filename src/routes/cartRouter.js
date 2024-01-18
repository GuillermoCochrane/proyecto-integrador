const express = require('express');
const router = express.Router();
const cartController = require("../controllers/cartController");
const userdataMDW = require("../middlewares/userDataMDW")

//Middlewares

//Products Routes

//Cart
router.get('/', cartController.index)

//Add Products to cart
router.post("/add/:id", cartController.add)

//Edit product in cart
router.get('/edit/:id', cartController.edit); 
router.put('/edit/:id', cartController.update); 

//Product in cart delete
router.get('/delete/:id', cartController.delete);
router.delete('/delete/:id', cartController.destroy); 

//Cart payment
router.get('/payment', cartController.payment);
router.post('/payment', userdataMDW, cartController.processPayment);


module.exports = router