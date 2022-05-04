"use scrict"
const joi = require("joi");
const {makeValidator} = require("./makeValidator")

const userSchema = joi.object({
    username: joi.string()
        .min(3)
        .token()
        .lowercase()
        .required(),
    password: joi.string()
        .min(6)
        .required(),
});

const userValidator = makeValidator(userSchema);

module.exports = {
    userValidator
}