const User = require("../models/User");

exports.home = (req, res) => {
  if (req.session.email) {
    res.render("timeline", { name: req.session.firstName });
  } else {
    res.render("index");
  }
};

exports.loginpage = (req, res) => {
  res.render("login");
};

exports.login = (req, res) => {
  let user = new User(req.body);

  user
    .login()
    .then((firstName) => {
      req.session.email = user.data.email;
      req.session.firstName = firstName;
      req.session.save(() => {
        res.redirect("/");
      });
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
  user
    .register()
    .then(() => {
      req.session.email = user.data.email;
      req.session.firstName = user.data.firstname;
      req.session.save();
    })
    .then(() => {
      res.redirect("/");
    });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
