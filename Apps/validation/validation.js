const joi = require('joi');

const DataValidation = joi.object({
    localId : joi.number().integer().min(1).max(9999).required(),
    localName : joi.string().required()
})

const NumberIdValidation = joi.object({
    localId : joi.number().integer().min(1).max(9999).required(),
})

module.exports = {DataValidation, NumberIdValidation};