const User = require("../model/User");

exports.index = (req, res) => {
  res.render("index");
};

exports.loginpage = (req, res) => {
  res.render("login");
};

exports.login = (req, res) => {
  let user = new User(req.body);
  user
    .login()
    .then(() => {
      res.render("dashboard");
    })
    .catch(() => {
      res.send("enter a valid email or password");
    });
};

exports.registerpage = (req, res) => {
  res.render("register");
};

exports.register = (req, res) => {
  let user = new User(req.body);
  user.register();
  res.send("You have successfully registered");
};
