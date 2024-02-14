const Joi = require('joi');

const productSchema = Joi.object({
name:Joi.string().required(),
frontImg:Joi.string().required(),
backImg:Joi.array(),
price:Joi.number().required().min(0),
about:Joi.string().trim(),
type:Joi.string().required(),
category:Joi.string().required(),
myCollection:Joi.string().required()
})

const reviewSchema = Joi.object({
rating:Joi.string().min(0).max(5),
comment:Joi.string().trim()
})

module.exports = {productSchema,reviewSchema};