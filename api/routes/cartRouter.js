const express = require('express');
const router = express.Router();
const CartController = require("../controllers/cartController");
const { authentication, adminAccess, normalAccess } = require("../middlewares/auth");

router.get("/", authentication, CartController.get);
router.get("/:cartID", authentication, CartController.detail);
router.post("/", authentication, CartController.create);
router.put("/:cartID", authentication, adminAccess, CartController.update);
router.delete("/:cartID", authentication, normalAccess, CartController.destroy);
router.patch("/:cartID", authentication, adminAccess, CartController.softDelete);
router.patch("/check-out/:cartID", authentication, normalAccess, CartController.checkOut);

module.exports = router;
