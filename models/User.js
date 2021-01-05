const bcrypt = require("bcryptjs");
const userCollection = require("../db").db().collection("userdata");

function User(data) {
  this.data = data;
}

module.exports = User;

User.prototype.register = function () {
  //hash password
  let salt = bcrypt.genSaltSync(10);
  this.data.password = bcrypt.hashSync(this.data.password, salt);
  //add data to database
  userCollection.insertOne(this.data);
};

User.prototype.login = function () {
  return new Promise((resolve, reject) => {
    userCollection
      .findOne({ email: this.data.email })
      .then((existingUser) => {
        if (
          existingUser &&
          bcrypt.compareSync(this.data.password, existingUser.password)
        ) {
          resolve("resolved");
        } else {
          reject("rejected");
        }
      })
      .catch(() => {
        console.log("Please try again later!");
      });
  });
};
