const {productSchema, orderSchema} = require("./schema.js");
const expressError = require("./utilities/expressError.js");

// PRODUCT VALIDATION
module.exports.validateProduct = (req, res, next) => {
    let {error} = productSchema.validate(req.body);
    if(error){
        let errorMsg = error.details.map((el) => el.message).join(","); 
        throw new expressError(400, errorMsg);
    }else{
        next();
    }
};

// ORDER VALIDATION
module.exports.validateOrder = (req, res, next) => {
    let {error} = orderSchema.validate(req.body);
    if(error){
        let errorMsg = error.details.map((el) => el.message).join(","); 
        throw new expressError(400, errorMsg);
    }else{
        next();
    }
};