const { check } = require("express-validator");
const usersRepository = require("../../repositories/users");

module.exports = {
  validateTitle: check("title")
    .trim()
    .isLength({ min: 5, max: 30 })
    .withMessage("Must be between 5 and 30 characters."),
  validatePrice: check("price")
    .trim()
    .toFloat()
    .isFloat({min: 1})
    .withMessage("Price required and it needs to a number.")
};