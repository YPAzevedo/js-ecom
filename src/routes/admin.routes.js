const express = require("express");
const { validationResult, check } = require("express-validator");
const usersRepository = require("../repositories/users");

const loginTemplate = require("../views/admin/login");
const signupTemplate = require("../views/admin/signup");

const {
  validateEmail: signupValidateEmail,
  validatePassword: signupValidatePassword,
} = require("./admin.signup.validators");

const {
  validateEmail: loginValidateEmail,
  validatePassword: loginValidatePassword,
} = require("./admin.login.validators");

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

    if (validationErrors.errors) {
      return res.send(loginTemplate(validationErrors));
    }

    req.session.userId = user.id;

    return res.send(`
    <h1>Logged in as: ${req.body.email} - ${user.id}</h1>
  `);
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

    if (validationErrors.errors) {
      return res.send(signupTemplate(validationErrors));
    }

    const user = await usersRepository.create({ email, password });

    req.session.userId = user.id;

    return res.send(`
    <h1>Account created for: ${req.body.email}</h1>
  `);
  }
);

adminRouter.get("/signup", (req, res) => {
  return res.send(signupTemplate());
});

module.exports = adminRouter;
