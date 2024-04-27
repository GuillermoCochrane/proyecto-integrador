const express = require('express');
const router = express.Router();
const usersAPIController = require("../../controllers/API/usersAPIController");

router.get("/email/:email", usersAPIController.emailCheck);
router.get("/username/:username", usersAPIController.usernameCheck);
router.get("/phone/:phone", usersAPIController.phoneCheck);
module.exports = router