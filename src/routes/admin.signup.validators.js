const { check } =  require('express-validator');
const usersRepository = require('../repositories/users')

module.exports = {
  validateEmail: check("email")
  .trim()
  .normalizeEmail()
  .isEmail()
  .withMessage("Must be valid email")
  .custom(async (email) => {
    const findUser = await usersRepository.getOneBy("email", email);

    if (findUser) {
      throw new Error("Email already is registered.");
    }
  }),
  validatePassword: check("password")
  .trim()
  .isLength({ min: 6, max: 12 })
  .withMessage("Must be between 6 and 12 characters"),
}