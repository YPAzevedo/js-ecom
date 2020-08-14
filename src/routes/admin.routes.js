const express = require("express");
const { validationResult, check } = require("express-validator");
const usersRepository = require("../repositories/users");

const loginTemplate = require("../views/admin/auth/login");
const signupTemplate = require("../views/admin/auth/signup");

const {
  validateEmail: signupValidateEmail,
  validatePassword: signupValidatePassword,
} = require("./validators/admin.signup.validators");

const {
  validateEmail: loginValidateEmail,
  validatePassword: loginValidatePassword,
} = require("./validators/admin.login.validators");

const adminRouter = express.Router();

adminRouter.get("/login", (req, res) => {
  return res.send(loginTemplate());
});

adminRouter.post(
  "/login",
  [
    loginValidateEmail,
    loginValidatePassword
  ],
  async (req, res) => {
    const { email } = req.body;

    const user = await usersRepository.getOneBy("email", email);

    const validationErrors = validationResult(req);

    if (validationErrors.errors.length) {
      return res.send(loginTemplate(validationErrors));
    }

    req.session.userId = user.id;

    return res.redirect("/admin/products");
  }
);

adminRouter.get("/logout", (req, res) => {
  req.session = null;

  return res.redirect("/login");
});

adminRouter.post(
  "/signup",
  [signupValidateEmail, signupValidatePassword],
  async (req, res) => {
    const { email, password } = req.body;

    const validationErrors = validationResult(req);

    if (validationErrors.errors.length) {
      return res.send(signupTemplate(validationErrors));
    }

    const user = await usersRepository.create({ email, password });

    req.session.userId = user.id;

    return res.redirect("/admin/products");
  }
);

adminRouter.get("/signup", (req, res) => {
  return res.send(signupTemplate());
});

module.exports = adminRouter;
