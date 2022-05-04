"use strict";
const joi = require("joi");

// Using separate validator function because of req.params

function makeValidator (schema) {
    return function (req, res, next) {
        const {value, error} = schema.validate(req.params, {
            abortEarly: false,
            stripUnknown: true, 
            errors: {
                escapeHtml: true,
            }
        });
        
        if (error) {
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(400).json({errorMessages});
        } 

        req.params = value;
        
        next();
    }
}

// Team Schema

const teamSchema = joi.object({
    team: joi.string()
})

// Week Schema

const weekSchema = joi.object({
    week: joi.string()
});

const validateTeam = makeValidator(teamSchema);
const validateWeek = makeValidator(weekSchema);

module.exports = {
    validateTeam,
    validateWeek
}