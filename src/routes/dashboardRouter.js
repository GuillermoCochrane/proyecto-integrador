const express = require('express');
const router = express.Router();
const dashboardRouter = require("../controllers/dasboardController");

//Middlewares

//Admin
router.get('/', dashboardRouter.index);
//Modify site email
router.get('/email', dashboardRouter.email);
//Create new product form
router.get('/new', dashboardRouter.newProduct);
//Display all prodcuts and Searchbar
router.get('/products', dashboardRouter.search);
router.get('/searchProducts', dashboardRouter.search);
//Display all users and seachbar
router.get('/users', dashboardRouter.allUsers);
router.get('/users/:id', dashboardRouter.user);
//Display all sales
router.get('/sales', dashboardRouter.allSales);
//Display pending sales
router.get('/pending', dashboardRouter.pendingSales);
// Display all categories
router.get('/categories', dashboardRouter.allCategories);
// Create  new catergory form
router.get('/addCategory', dashboardRouter.newCategory);

module.exports = router