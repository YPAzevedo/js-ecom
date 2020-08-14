  
const express = require("express");

const adminRouter = require("./admin.routes");
const productsRouter = require("./products.routes");

const router = express.Router();

router.use("/", adminRouter, productsRouter);

module.exports = router;