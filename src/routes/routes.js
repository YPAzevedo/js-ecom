  
const express = require("express");

const adminRouter = require("./admin.routes");

const router = express.Router();

router.use("/", adminRouter);

module.exports = router;