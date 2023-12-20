const Joi = require('joi');

module.exports.productSchema = Joi.object({
    product: Joi.object({
        name:Joi.string().required(),
        desc:Joi.string().required(),
        qty:Joi.number().required().min(100),
        price:Joi.number().required().min(100),
        mfname:Joi.string().required(),
        pdcategory:Joi.string().required(),
        stockcategory: Joi.string().required(),
        image:Joi.string().allow("", null),
    }).required()
});

module.exports.orderSchema = Joi.object({
    order: Joi.object({
        customername:Joi.string().required(),
        qty:Joi.number().required().min(1),
        description:Joi.string().allow("", null),
    }).required()
});