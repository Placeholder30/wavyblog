const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");

router.get("/", userController.home);

router.get("/loginpage", userController.loginpage);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

router.get("/registerpage", userController.registerpage);
router.post("/register", userController.register);

module.exports = router;
