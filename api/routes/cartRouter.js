const express = require('express');
const router = express.Router();
const CartController = require("../controllers/cartController");
const { authentication, adminAccess, limitedAccess } = require("../middlewares/auth");

router.get("/", authentication, CartController.get);
router.get("/:cartID", authentication, limitedAccess, CartController.detail);
router.post("/", authentication, CartController.create);
router.put("/:cartID", authentication, adminAccess, CartController.update);
router.delete("/:cartID", authentication, limitedAccess, CartController.destroy);
router.patch("/:cartID", authentication, adminAccess, CartController.softDelete);
router.patch("/check-out/:cartID", authentication, limitedAccess, CartController.checkOut);

module.exports = router;
