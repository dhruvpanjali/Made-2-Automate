const express = require("express");
const router = express.Router({mergeParams: true}); 

const OrderController = require("../controllers/orders.js");

const wrapAsync = require("../utilities/wrapAsync.js");
const Product = require("../models/product.js");
const Order = require("../models/orders.js");

// Show Order route
router.get("/:id", wrapAsync(OrderController.showOrder));

// Show orders route (ALL)
router.get("/", wrapAsync( async(req, res) => {
    const products = await Product.find({});
    const orders = await Order.find({});
    const orderCount = await Order.countDocuments();

    // ordered products details calculate
    let orderedProducts = [];
    for (const order of orders) {
        for (const prd of products) {
            if (prd.orders.includes(order._id)) {
                const orderedProduct = {
                    product: prd,
                    order: order,
                };
                orderedProducts.push(orderedProduct);
                break;
            }
        }
    }

    res.render("dashboard/orders.ejs", {orderedProducts, orderCount});
}));

module.exports = router;