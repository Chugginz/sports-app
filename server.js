"use strict";
require("dotenv").config();

const app = require("./app");
//const liveChat = require("./Controllers/liveChat.js");

app.listen(process.env.PORT, () => {
    console.log(`Listening on port: ${process.env.PORT}`);
});