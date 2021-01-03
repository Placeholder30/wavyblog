const userCollection = require("../db").collection("userdata");

function User(data) {
  this.data = data;
  this.errors = [];
}

module.exports = User;

User.prototype.register = function () {
  userCollection.insertOne(this.data);
};

User.prototype.login = function () {
  return new Promise((resolve, reject) => {
    userCollection
      .findOne({ email: this.data.email })
      .then((attemptedUser) => {
        if (attemptedUser && attemptedUser.password == this.data.password) {
          resolve("resolved");
        } else {
          reject("rejected");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
