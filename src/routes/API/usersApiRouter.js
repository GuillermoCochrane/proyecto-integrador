const express = require('express');
const router = express.Router();
const usersAPIController = require("../../controllers/API/usersAPIController");

router.get("/email/:email", usersAPIController.emailCheck);
router.get("/username/:username", usersAPIController.usernameCheck);
module.exports = router