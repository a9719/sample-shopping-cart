var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var mongoose = require('mongoose')
var session = require("express-session")
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use('/', require('./routes.js'));
var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Application is running on ${port}`);
});

module.exports = app;