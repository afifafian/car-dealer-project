const express = require('express');
const router = express.Router();
const userRouter = require("./userRouter");
const carRouter = require("./carRouter");
const cartRouter = require("./cartRouter");

router.use("/users", userRouter);
router.use("/cars", carRouter);
router.use("/cart", cartRouter);

module.exports = router;
