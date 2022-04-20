"use strict";
require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.static(__dirname + '/public'));

/*app.post("/api/footballScores", (req,res) => {
    loadInfo();
})*/

app.set('view engine', 'ejs');

// Load controllers
const footballController = require('./Controllers/footballController');

app.get("/football/scores", footballController.renderScores);

module.exports = app;