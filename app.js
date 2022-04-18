"use strict";
require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.static(__dirname + '/public'));

app.post("/api/footballScores", (req,res) => {
    loadInfo();
})

module.exports = app;