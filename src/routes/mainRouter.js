const express = require('express');
const router = express.Router();
const mainController = require("../controllers/mainController")

//rutas 

router.get('/', mainController.index);

router.get("/search", mainController.search)

router.post("/category", mainController.category)

router.post("/status", mainController.status)

router.get("/help", mainController.help)

module.exports = router