const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  name: String,
  type: { type: String, default: "song" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("song", SongSchema);