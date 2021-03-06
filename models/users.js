const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  job: String,
  saved_job: [],
  date: { type: Date, default: Date.now },
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
