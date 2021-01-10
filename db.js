const mongodb = require("mongodb");
const dotenv = require("dotenv");
const chalk = require("chalk");
dotenv.config();

mongodb.connect(
  process.env.DBCONNECTION,
  { useUnifiedTopology: true },
  (err, client) => {
    try {
      module.exports = client;
      const app = require("./app");
      console.log("connection to db successful");
    } catch (err) {
      console.log(chalk.red("an error occured connecting to db"), err);
    }
  }
);
