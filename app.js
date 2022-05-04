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
	app.use(
		helmet({
			contentSecurityPolicy: {
				directives: {
					"img-src": ["'self'", "a.espncdn.com"], // Add domains to this array
				},
			},
			crossOriginResourcePolicy: {
				policy: "cross-origin"
			}
		})
);; // Add helmet in production
}

// Development/Production Session Configuration
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

// Error Handlers
const {notFoundHandler, productionErrorHandler, catchAsyncErrors} = require("./utils/errorHandlers");

// Validators
const {userValidator} = require("./Validators/userValidator");
const {validateTeam, validateWeek} = require("./Validators/footballValidator");

// Models
const footballModel = require("./Models/footballModels");
const contentModel = require("./Models/contentModels");

// Controllers
const footballController = require("./Controllers/footballController");
const userController     = require("./Controllers/userController");
const contentController  = require("./Controllers/contentController");

// Database Population
catchAsyncErrors(contentModel.storeContent()); 
catchAsyncErrors(footballModel.populateDatabase());

// Global Middleware
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json({limit: '200kb'}))

// Homepage Endpoints
app.get("/home", contentController.renderContent);
// Football Endpoints
app.get("/football/scores", footballController.renderScores);
app.get("/football/scores/team/:team", validateTeam ,footballController.renderTeam);
app.get("/football/scores/:week", validateWeek ,footballController.renderWeek);
// Login Endpoints
app.post("/api/user", userValidator, userController.createNewUser)
app.post("/api/login", userValidator, userController.login)

//Error Handlers
// Handles 404 errors
app.use(notFoundHandler);

// Handles 500 errors
if(isProduction){
	app.use(productionErrorHandler);
}

module.exports = app;