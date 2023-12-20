const express = require("express");
const router = express.Router({mergeParams: true}); 
const {validateProduct} = require("../middlewares.js");

const ProductController = require("../controllers/products.js");

const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

const wrapAsync = require("../utilities/wrapAsync.js");

// --------------------------REST API's----------------------------------------

// Dashboard route
router.get("/dashboard", wrapAsync(ProductController.dashboard));

// Add product route
router.get("/add", ProductController.productForm);

// Success route
router.post("/add/message", upload.single("product[image]"), validateProduct, wrapAsync(ProductController.productFormSuccess));

// Edit route
router.post("/edit/message", upload.single("product[image]"), wrapAsync(ProductController.productFormSuccess));
router.post("/edit", ProductController.editProduct);

// Product Save route
router.post("/saveProduct", ProductController.productFormSave);

// Barcode Scanner Route
router.get("/scanBarcode", ProductController.barcodeScanner);

// Ecommerce Listing Route
router.get("/ecommerce/listing/:id", wrapAsync(ProductController.ecomerceListingPage));

module.exports = router;