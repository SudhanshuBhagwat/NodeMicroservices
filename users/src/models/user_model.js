const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  type: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("user", UserSchema);