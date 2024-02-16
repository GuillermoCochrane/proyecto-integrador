const express = require('express');
const router = express.Router();
const dashboardRouter = require("../controllers/dasboardController");

//Middlewares
const upload = require("../middlewares/productsMulterMDW");
const productValidations = require("../middlewares/productValidationsMDW");

//Admin
router.get('/', dashboardRouter.index);

//Modify site email
router.get('/email', dashboardRouter.email);

//Create new product form
router.get('/new', dashboardRouter.newProduct);
router.post("/products/create",upload.single("img"), productValidations, dashboardRouter.store);

//Display all prodcuts and Searchbar
router.get('/products', dashboardRouter.allProducts);
router.get('/products/:id', dashboardRouter.product);
router.get('/searchProducts', dashboardRouter.allProducts);

// Edit product form
router.get('/products/edit/:id', dashboardRouter.editProduct);
router.put('/products/edit/:id', upload.single("img"), productValidations, dashboardRouter.update); 

//Product delete
router.get('/products/delete/:id', dashboardRouter.delete);
router.delete('/products/delete/:id', dashboardRouter.destroy); 

// Product not found 
router.get('/notFound', dashboardRouter.productNotFound);

//Display all users and seachbar
router.get('/users', dashboardRouter.allUsers);
router.get('/users/:id', dashboardRouter.user);
router.get('/searchUsers', dashboardRouter.allUsers);

//Display all sales
router.get('/sales', dashboardRouter.allSales);

//Display pending sales
router.get('/pending', dashboardRouter.pendingSales);

// Display all categories
router.get('/categories', dashboardRouter.allCategories);

//Edit category
router.get('/category/:idCategory', dashboardRouter.allCategories);

//Edit Status
router.get('/status/:idStatus', dashboardRouter.allCategories);

// Create  new catergory form
router.get('/addCategory', dashboardRouter.newCategory);

module.exports = router