"use strict";
require("dotenv").config();

const express = require("express");
const app = express();
// const dictionaryModel = require("./Models/dictionaryModel");


// The maximum request body size is 100 kilobytes; however, my word list was
// ~150kb. So I just doubled the request body size limit
app.use(express.static("public", {
    index: "index.html",
    extensions: ['html']
}));
app.use(express.json({limit: '200kb'}));
app.use(express.urlencoded({ extended: false }));

const liveChat = require('./Controllers/liveChat');

module.exports = app;