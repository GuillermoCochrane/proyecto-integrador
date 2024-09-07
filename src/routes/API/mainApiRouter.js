const express = require('express');
const router = express.Router();
const mainController = require("../../controllers/API/mainApiController")

router.get("/search", mainController.search)
router.get("/up", mainController.up)

module.exports = router