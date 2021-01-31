const User = require("../models/User");

exports.home = async (req, res) => {
  if (req.session.email) {
    let posts = await User.post(req.session.email);
    res.render("timeline", { name: req.session.firstName, posts: posts });
  } else {
    res.render("index");
  }
};

exports.loginpage = (req, res) => {
  res.render("login");
};

exports.login = async (req, res) => {
  let user = new User(req.body);
  try {
    let firstName = await user.login();
    req.session.email = user.data.email;
    req.session.firstName = firstName;
    await req.session.save();
    res.redirect("/");
  } catch (error) {
    res.send("enter a valid email or password");
  }
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
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

//use ckeditor for createPost page

exports.createPost = (req, res) => {
  req.session.email
    ? res.render("createPost", { name: req.session.firstName })
    : res.redirect("/");
};

exports.makePost = (req, res) => {
  // console.log(req.session.email);
  if (req.session.email) {
    let user = new User(req.body, req.session.email);
    user.createPost().then(res.send("Post successfully sent!"));
  }
};
