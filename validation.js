//Validation
const Joi = require('@hapi/joi');
const { response } = require('express');


//Register Validation
function registerValidation(data){
    const schema = {
        name: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)    
            .required()
    };
    return Joi.validate(data, schema);
}


function loginValidation(data){
    const schema = {
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)    
            .required()
    };
    return Joi.validate(data, schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;