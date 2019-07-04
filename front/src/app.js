const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/check', (req, res) => {
    res.send(JSON.stringify({
        message: 'Hello World!!',
        status: 200
    }));
})

app.get('/', (req, res) => {
    res.render('index');
})

module.exports = app;