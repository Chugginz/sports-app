"use strict";

const contentModel = require("../Models/contentModels");

function renderContent(req, res) {
    const contents = contentModel.getContent();

    res.render("home", {"contents": contents});
}

module.exports = {
    renderContent
}