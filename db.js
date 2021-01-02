const mongodb = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

mongodb.connect(
  process.env.DBCONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    try {
      module.exports = client.db();
      console.log("connection to db successful");
      const app = require("./app");
    } catch (err) {
      console.log(err);
    }
  }
);
