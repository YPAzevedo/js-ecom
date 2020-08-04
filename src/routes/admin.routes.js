const express = require("express");
const usersRepository = require("../repositories/users");

const adminRouter = express.Router();

adminRouter.get("/login", (req, res) => {
  return res.send(`
    <h1>Login</h1>
    <div>
      <form method="POST" action="/admin/login">
        <input name="email" type="email" placeholder="email" />
        <input name="password" type="password" placeholder="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  `);
});

adminRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await usersRepository.getOneBy("email", email);
  if (!user) {
    return res.status(404).json({ error: "Wrong email/password." });
  }

  const canLogin = await usersRepository.comparePassword(
    user.password,
    password
  );

  if (!canLogin) {
    return res.status(404).json({ error: "Wrong email/password." });
  }

  req.session.userId = user.id;

  return res.send(`
    <h1>Logged in as: ${req.body.email}</h1>
  `);
});

adminRouter.get("/logout", (req, res) => {
  req.session = null;

  return res.redirect("/admin/login");
});

adminRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const findUser = await usersRepository.getOneBy("email", email);
  if (findUser) {
    return res.send(`
      <h1>Account already created for: ${req.body.email}</h1>
    `);
  }

  const user = await usersRepository.create({ email, password });

  console.log(user);

  req.session.userId = user.id;

  return res.send(`
    <h1>Account created for: ${req.body.email}</h1>
  `);
});

adminRouter.get("/signup", (req, res) => {
  return res.send(`
    <h1>Sign up</h1>
    <div>
      <form method="POST" action="/admin/signup">
        <input name="email" type="email" placeholder="email" />
        <input name="password" type="password" placeholder="password" />
        <button type="submit">Sign up</button>
      </form>
    </div>
  `);
});

module.exports = adminRouter;
