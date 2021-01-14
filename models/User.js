const bcrypt = require("bcryptjs");
const userCollection = require("../db").db().collection("userdata");

class User {
  constructor(data) {
    this.data = data;
  }
  register(callback) {
    //hash password
    let salt = bcrypt.genSaltSync(10);
    this.data.password = bcrypt.hashSync(this.data.password, salt);

    //add data to database
    userCollection.insertOne(this.data);
    callback();
  }
  login() {
    return new Promise((resolve, reject) => {
      userCollection
        .findOne({ email: this.data.email })
        .then((existingUser) => {
          if (
            existingUser &&
            bcrypt.compareSync(this.data.password, existingUser.password)
          ) {
            resolve(existingUser.firstname);
          } else {
            reject("rejected");
          }
        })
        .catch(() => {
          console.log("Please try again later!");
        });
    });
  }
}

module.exports = User;
