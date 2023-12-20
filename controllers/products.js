const Product = require("../models/product.js");
const Order = require("../models/orders.js");
var JsBarcode = require('jsbarcode');
var Canvas = require("canvas");
var { createCanvas } = require("canvas");

module.exports.dashboard = async(req, res) => {
    const products = await Product.find({});
    const orders = await Order.find({});
    const productCount = await Product.countDocuments();
    const orderCount = await Order.countDocuments();

    // Total Revenue Calculate
    let revenue = 0, newStock = 0;
    for(let prd of products){
        // Total Revenue Calculate
        if(prd.orders.length > 0){
            revenue += prd.price * prd.orders.length;
        }
        // New Stock Calculate
        if(prd.stockcategory == "New Stock"){
            newStock++;
        }
    }
    // ordered product details calculate
    let orderedProducts = orders.flatMap(order => {
        const productsForOrder = products.filter(prd => prd.orders.includes(order._id));
        return productsForOrder.map(prd => ({ product: prd, order: order }));
    });
    
    res.render("dashboard/index.ejs", {
        products, productCount, orderCount, revenue, newStock, orderedProducts
    });
};

module.exports.productForm = (req, res) => {
    res.render("dashboard/productForm.ejs");
};

module.exports.productFormSuccess = async(req, res) => {

    let url = req.file.path;
    let filename = req.file.filename;

    const newProduct = new Product(req.body.product);
    newProduct.pname = req.body.product.pname;
    newProduct.image = {url, filename};

    // Generate barcode
    const canvas = createCanvas();
    JsBarcode(canvas, newProduct._id, { format: 'CODE128', fontSize: 35, fontOptions: "bold"});

    // Convert canvas to base64
    const barcodeImgSrc = canvas.toDataURL();

    res.render("dashboard/productShow.ejs", {newProduct, barcodeImgSrc});
};

module.exports.editProduct = (req, res) => {
    let url = req.body.url;
    let filename = req.body.filename;

    res.locals.url = url;
    res.locals.filename = filename;

    const savedProduct = new Product(req.body);
    savedProduct.image = {url, filename};

    res.render("dashboard/productEditForm.ejs", {savedProduct});
};

module.exports.productFormSave = async (req, res) => {

    let url = req.body.url;
    let filename = req.body.filename;

    const savedProduct = new Product(req.body);
    savedProduct.image = {url, filename};

    await savedProduct.save();
    res.redirect(`/products/ecommerce/listing/${savedProduct._id}`);
};

module.exports.ecomerceListingPage = async(req, res) => {

    const {id} = req.params;
    const product = await Product.findById(`${id}`);

    res.render("dashboard/ecommerceListingPage.ejs", {product});
};

module.exports.barcodeScanner = (req, res) => {
    res.render("dashboard/barcodeScanner.ejs");
};