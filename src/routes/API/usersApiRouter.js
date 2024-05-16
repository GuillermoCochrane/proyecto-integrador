const express = require('express');
const router = express.Router();
const usersAPIController = require("../../controllers/API/usersAPIController");

router.get("/email/:email", usersAPIController.emailCheck);
router.get("/username/:username", usersAPIController.usernameCheck);
router.get("/phone/:phone", usersAPIController.phoneCheck);
router.get("/userlogged", usersAPIController.userlogged);
router.get("/search", usersAPIController.search);
module.exports = router