const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const chalk = require("chalk");
const app = express();

const sessionOptions = session({
  secret: "this is my secret",
  store: new MongoStore({ client: require("./db") }),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60, httpOnly: true },
});

app.use(express.static("public"));
app.use(sessionOptions);

app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const router = require("./router");

app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log(`Your app is now listening on port ${process.env.PORT}`);
  console.log(
    `Click to run your app: ${chalk.underline.magenta(
      "http://localhost:3000"
    )} `
  );
});

module.exports = app;
