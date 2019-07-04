const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user_model');

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
        message: `This is the Users microservice`,
        status: 200
    }));
})

app.get("/api/v1/users", async (req, res) => {
  const users = await User.find({});
  res.send(JSON.stringify(users));
});

app.post("/api/v1/users", async (req, res) => {
  const user = new User({ name: req.body.name });
  const savedUser = await user.save();
  res.send(JSON.stringify(savedUser));
});

module.exports = app;