const userCollection = require("../db").collection("userdata");

function User(data) {
  this.data = data;
  this.errors = [];
}

module.exports = User;

User.prototype.register = function () {
  userCollection.insertOne(this.data);
};

User.prototype.login = function (callback) {
  userCollection.findOne({ email: this.data.email }, (err, attemptedUser) => {
    if (err) console.log(err);

    if (attemptedUser && attemptedUser.password == this.data.password) {
      callback("login");
    } else {
      callback();
    }
  });
};
