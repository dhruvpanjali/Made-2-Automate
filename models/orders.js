const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    customername: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        min: 1,
        required: true
    },
    message: {
        type: String
    }
});

const Order = new mongoose.model("Order", OrderSchema);
module.exports = Order;