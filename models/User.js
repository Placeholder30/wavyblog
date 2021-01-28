const bcrypt = require("bcryptjs");
const session = require("express-session");
const userCollection = require("../db").db().collection("userdata");
const postCollection = require("../db").db().collection("postdata");

// let finding = postCollection.find({ email: "Anon@Doe.com" }).toArray();
// finding.then((dat) => {
//   console.log(dat);
// });
//
class User {
  constructor(data, sessionEmail) {
    this.data = data;
    this.sessionEmail = sessionEmail;
  }
  register() {
    return new Promise(async (resolve, reject) => {
      //hash password
      let salt = bcrypt.genSaltSync(10);
      this.data.password = bcrypt.hashSync(this.data.password, salt);

      //add data to database
      await userCollection.insertOne(this.data);
      resolve();
    });
  }

  async login() {
    try {
      return new Promise(async (resolve, reject) => {
        let existingUser = await userCollection.findOne({
          email: this.data.email,
        });
        if (
          existingUser &&
          bcrypt.compareSync(this.data.password, existingUser.password)
        ) {
          resolve(existingUser.firstname);
        } else {
          reject("rejected");
        }
      });
    } catch (err) {
      return err(err);
    }
  }

  async createPost() {
    let postData = this.data;
    postData.email = this.sessionEmail;
    console.log(this.data);
    try {
      await postCollection.insertOne(postData);
    } catch (err) {
      return err;
    }
  }
}

module.exports = User;
