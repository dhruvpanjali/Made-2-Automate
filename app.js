if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const expressError = require("./utilities/expressError.js");
app.engine("ejs", ejsMate);
const path = require("path");
const ProductsRoute = require("./routes/product.js");
const OrdersRoute = require("./routes/order.js");

app.use(methodOverride('_method'))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// ------------ Establishing Connection --------------------
const databaseUrl = process.env.ATLASDB_URL;

main().then((res) => {
    console.log("connected to database");
})
.catch((err) => {
    console.log(err);
});

async function main() {
   await mongoose.connect(databaseUrl);
}
// -------------------------------------------------------------

// Api Middlewares
app.get("/", (req,res) => {
    res.redirect("/products/dashboard");
});
app.use("/products", ProductsRoute);
app.use("/orders", OrdersRoute);

// ----------------------------------------------------------------------------------

app.all("*", (req, res, next) => {
    next(new expressError(404, "Page not found"));
});

// Express Middleware (ERROR ROUTE)
app.use((err, req, res, next) => {
    let { status = 500, message = "Something Went Wrong"} = err;
    res.status(status).render("error.ejs", {err});
});

// -----------------------------------------------------
app.listen(3000, () => {
    console.log("app is listening on port 3000");
});