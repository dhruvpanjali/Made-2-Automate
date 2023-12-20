const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        min: 1,
        required: true
    },
    price: {
        type: Number,
        min: 100,
        required: true
    },
    mfname: {
        type: String,
        required: true
    },
    pdcategory:{
        type: String,
        enum: ["Controller", "Relay", "Sensor"],
        required: true
    },
    stockcategory:{
        type: String,
        enum: ["New Stock", "Sold Stock"],
        required: true
    },
    image: {
        url: String,
        filename: String
    },
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
});

const Product = new mongoose.model("Product", ProductSchema);
module.exports = Product;