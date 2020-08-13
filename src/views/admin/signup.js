const withLayout = require("../layout");

const getError = (errors, name) => {
  try {
    return errors.mapped()[name].msg;
  } catch (error) {
    return ''
  }
};

module.exports = (errors) =>
  withLayout(`
  <h1>Sign up</h1>
  <div>
    <form method="POST" action="/signup">
      <input name="email" type="email" placeholder="email" />
      ${!!errors ? `<small style="color: red">${getError(errors, "email")}</small>` : ""}
      <input name="password" type="password" placeholder="password" />
      ${!!errors ? `<small style="color: red">${getError(errors, "password")}</small>`: ""}
      <button type="submit">Sign up</button>
    </form>
  </div>
`);
