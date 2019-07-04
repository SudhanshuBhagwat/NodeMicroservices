const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Song = require('./models/song_model');

let DB_URI = "mongodb://localhost:27017/microservices";

if (process.env.MONGO_DB_URI) {
  DB_URI = process.env.MONGO_DB_URI;
}

mongoose.connect(DB_URI);

const app = express();

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
    res.send(JSON.stringify({
        message: `This is the Songs microservice`,
        status: 200
    }));
})

app.get("/api/v1/songs", async (req, res) => {
  const songs = await Song.find({});
  res.json(songs);
});

app.post("/api/v1/songs", async (req, res) => {
  console.log(req.body.name);
  const song = new Song({ name: req.body.name });
  const savedSong = await song.save();
  res.json(savedSong);
});

module.exports = app;