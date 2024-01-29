const express = require('express');
const router = express.Router();
const adminController = require("../controllers/adminController");

//Middlewares

//Admin
router.get('/', adminController.index)

module.exports = router