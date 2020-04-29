const express = require("express");
const router = express.Router();
const userController = require("../controllers/User");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/get", userController.getAllUser);

module.exports = router;
