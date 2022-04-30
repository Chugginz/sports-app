"use strict";
require("dotenv").config();

// Production Security
const helmet = require("helmet");
// Initializing variable for if deploying in development
const isDevelopement = !process.env.NODE_ENV || process.env.NODE_ENV === "development";
// Initializing variable for if deploying in production
const isProduction = process.env.NODE_ENV === "production";
//Redos Session Management
const redis = require('redis');
const session = require('express-session');
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient();
// Standard App Setup
const express = require("express");
const app = express();

// if in production, set up protections
if (isProduction) {
	app.set('trust proxy', 1);
	app.use(require("helmet")()); // Add helmet in production
}

const sessionConfig = {
	store: new RedisStore({ client: redisClient }),
	secret: process.env.COOKIE_SECRET,
	resave: false,
	saveUninitialized: false,
	name: "session",
	cookie: {
			sameSite: isProduction,
			secure: isProduction,
			httpOnly: true,
	    maxAge: process.env.MAX_AGE || 1000 * 60 * 60 * 8, // Defaults to 8 hours
	}
};

app.use(express.static(__dirname + '/public'));

/*app.post("/api/footballScores", (req,res) => {
    loadInfo();
})*/

app.set('view engine', 'ejs');

// Load controllers
const footballController = require('./Controllers/footballController');

app.get("/football/scores", footballController.renderScores);

module.exports = app;