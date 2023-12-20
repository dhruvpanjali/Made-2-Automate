const Product = require("../models/product.js");
const Order = require("../models/orders.js");

module.exports.showOrder = async(req, res) => {
    const {id} = req.params;

    const selectedOrder = await Order.findById(id);
    const orderedProduct = await Product.findOne({ orders: id });

    res.render("dashboard/showOrder.ejs", {selectedOrder, orderedProduct});
};