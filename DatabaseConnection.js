const mongodb = require("mongodb");
const mongoose = require("mongoose");
const db = {};
db.makeConnection = async () => {
  try {
    const db_url = process.env.MONGO_URI.replace(
      "<password>",
      process.env.DATABASE_PASSWORD
    );
    await mongoose.connect(db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connection established successfully");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
db.checkConnection = async () => {
  try {
    const connection = await mongoose.connection.readyState;
    if (connection === 1) {
      console.log("Database connection is established");
      return true;
    } else {
      console.log("Database connection is not established");
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

db.closeConnection = async () => {
  try {
    await mongoose.connection.close();
    console.log("Database connection closed successfully");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
module.exports = db;
