"use strict";

const crypto = require("crypto");

// Saldivar's error handler's
// Handles error 404
function notFoundHandler (req, res, next) {
    res.status(404).render("error", {
        "status": 404,
        "message": `Couldn't find ${req.path}`, 
        "title": "Not Found",
    });
};

// Handles error 500
function productionErrorHandler (err, req, res, next) {
    res.status(500).render("error", {
        "status": 500,
        "message": `The server broke! We're working on it!`,
        "title": "The server's on fire!",
    });
};

// Handles async errors
function catchAsyncErrors (fn) {
    return function(req, res, next) {
        return fn(req, res, next).catch(next);
    };
};

module.exports = {
    notFoundHandler,
    productionErrorHandler,
    catchAsyncErrors,
};