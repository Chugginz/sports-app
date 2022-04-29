"use strict";
require("dotenv").config();

const express = require("express");
const app = express();

const redis = require('redis');
const session = require('express-session');

let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient({
    auth_pass: process.env.AUTH_PASSWORD,
});

const sessionConfig = {
  store: new RedisStore({ client: redis.createClient() }),
  secret: process.env.COOKIE_SECRET, 
  resave: false,
  saveUninitialized: false,
  name: "session", // now it is just a generic name
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 8, // 8 hours
  },
};

app.use(session(sessionConfig))

app.use(express.static(__dirname + '/public'));

app.use(express.json({limit: '200kb'}))

/*app.post("/api/footballScores", (req,res) => {
    loadInfo();
})*/

app.set('view engine', 'ejs');

// Load controllers
const footballController = require('./Controllers/footballController');
const userController     = require("./Controllers/userController")

// Load Validators
const userValidator = require("./Validators/userValidator");


const { application } = require("express");


app.get("/football/scores", footballController.renderScores);
app.post("/api/user", userValidator.userValidator, userController.createNewUser)
app.post("/api/login", userValidator.userValidator, userController.login)


module.exports = app;