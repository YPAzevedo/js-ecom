const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const routes = require("./routes/routes");

const app = express();
app.use(express.json()); // handle JSON
app.use(bodyParser.urlencoded({ extended: true })); // handle Form Data
app.use(
  cookieSession({
    name: "session",
    keys: ["@js-ecom"],
  })
);

const PORT = process.env.PORT || 3333;

app.use(routes)

app.listen(PORT, () => console.log(`🔥 Server running on: ${PORT}`));
