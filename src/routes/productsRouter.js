const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const productsController = require("../controllers/productsController")

//Multer config

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, "../../public/images/products"))
    },
    filename: function(req,file, cb){
        let newFileName = "product" + Date.now() + path.extname(file.originalname)
        cb(null, newFileName)
    }
})

const upload = multer({storage})

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
router.post("/create",upload.single("img"),productsController.store)

//Edit Products
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', upload.single("img"), productsController.update); 

//Product delete
router.get('/delete/:id', productsController.delete);
router.delete('/delete/:id', productsController.destroy); 

//Product detail
router.get("/:id/", productsController.detail)

module.exports = router