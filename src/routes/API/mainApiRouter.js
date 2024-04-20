const express = require('express');
const router = express.Router();
const mainController = require("../../controllers/API/mainApiController")

router.get("/search", mainController.search)

module.exports = router