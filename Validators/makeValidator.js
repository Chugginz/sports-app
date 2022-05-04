"use strict";

function makeValidator (schema) {
    return function (req, res, next) {
        const {value, error} = schema.validate(req.body, {
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

        req.body = value;
        
        next();
    }
}

module.exports = {
    makeValidator
};