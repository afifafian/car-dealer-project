const express = require('express');
const router = express.Router();
const { authentication, adminAccess } = require("../middlewares/auth");

const CarController = require("../controllers/carController");

router.get("/", authentication, CarController.get);
router.get("/:carID", authentication, CarController.detail);
router.post("/", authentication, adminAccess, CarController.create);
router.put("/:carID", authentication, adminAccess, CarController.update);
router.patch("/:carID", authentication, adminAccess, CarController.softDelete);

module.exports = router;
