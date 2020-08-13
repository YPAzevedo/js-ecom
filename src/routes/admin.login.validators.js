const { check } = require("express-validator");
const usersRepository = require("../repositories/users");

module.exports = {
  validateEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Not valid email.")
    .custom(async (email) => {
      const user = await usersRepository.getOneBy("email", email);
      if (!user) {
        throw new Error("Wrong email/password");
      }
    }),
  validatePassword: check("password")
    .trim()
    .custom(async (password, { req }) => {
      const user = await usersRepository.getOneBy("email", req.body.email);
      
      const canLogin = user
        ? await usersRepository.comparePassword(user.password, password)
        : false;

      if (!canLogin) {
        throw new Error("Wrong email/password");
      }
    }),
};
