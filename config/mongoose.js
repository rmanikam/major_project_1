const mongoose = require("mongoose");
// connect to database which is mongodb
mongoose.connect("mongodb://0.0.0.0:27017/codeial_development");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});

module.exports = db;
