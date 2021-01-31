const bcrypt = require("bcryptjs");
const session = require("express-session");
const userCollection = require("../db").db().collection("userdata");
const postCollection = require("../db").db().collection("postdata");

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
    try {
      await postCollection.insertOne(postData);
    } catch (err) {
      return err;
    }
  }
}
//Send a post!!
User.post = function (email) {
  let posts = postCollection.find({ email: email }).toArray();
  return posts;
};

module.exports = User;
