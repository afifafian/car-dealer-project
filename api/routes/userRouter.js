const express = require('express');
const router = express.Router();
const UserController = require("../controllers/userController");
const { authentication, adminAccess } = require("../middlewares/auth");

router.post("/register", UserController.reister);
router.post("/login", UserController.login);

router.get("/", authentication, adminAccess, UserController.findAll);

module.exports = router;
