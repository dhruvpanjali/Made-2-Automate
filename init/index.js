const mongoose = require("mongoose");

const initdata = require("./productData.js");
const Product = require("../models/product.js");

// const initdata = require("./orderData.js");
const Order = require("../models/orders.js");

// ------------establishing mongoose connection-----------------
const Monog_url = "mongodb://127.00.1:27017/made2automate";

main().then((res) => {
    console.log("connected to database");
})
.catch((err) => {
    console.log(err);
});

async function main() {
   await mongoose.connect(Monog_url);
}
// ------------------Inserting Data------------------------------------------

const initDB = async () => {
    // await Product.deleteMany({});
    // await Order.deleteMany({});

    initdata.data = initdata.data.map((obj) => ({...obj, orders: ["657fc1e10307799c712e4919"]}));
    
    await Product.insertMany(initdata.data);
    // await Order.insertMany(initdata.data);

    console.log("Data Inserted");
}

initDB();

// ----------------------------------------------------------------------------
// const find = async() => {
//     let res = await Product.findOne({qty: 150}).populate("orders");
//     console.log(res);
// };
// find();