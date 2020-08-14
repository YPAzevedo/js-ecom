const express = require("express");
const { validationResult } = require("express-validator");
const multer = require("multer");

const productsRepository = require('../repositories/products');

const { validateTitle, validatePrice } = require('../routes/validators/admin.products.add')

const productsAddTemplate = require("../views/admin/products/products.add");

const productsRouter = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

productsRouter.get("/admin/products", (req, res) => {
  return res.send(productsAddTemplate());
});

productsRouter.get("/admin/products/add", (req, res) => {
  return res.send(productsAddTemplate());
});

productsRouter.post(
  "/admin/products/add",
  upload.single('image'), // <-- multer parser has to come before the validations, since we are sending multi-part form now, req.body wasnt parsed by bodyParser, multer will parde the req.body here
  [validateTitle, validatePrice],
  async (req, res) => {
    const image = req.file.buffer.toString('base64');
    const { title, price } = req.body;
    await productsRepository.create({ title, price, image })

    const validationErrors = validationResult(req);

    console.log(validationErrors.errors)

    if (validationErrors.errors.length) {
      return res.send(productsAddTemplate(validationErrors));
    }

    return res.send(productsAddTemplate());
  }
);

module.exports = productsRouter;
