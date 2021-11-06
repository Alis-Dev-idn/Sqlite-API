const joi = require('joi');

const DataValidation = joi.object({
    localId : joi.number().min(0).max(1000).required(),
    localName : joi.string().required()
})

const NumberIdValidation = joi.object({
    localId : joi.number().min(0).max(1000).required(),
})

module.exports = {DataValidation, NumberIdValidation};