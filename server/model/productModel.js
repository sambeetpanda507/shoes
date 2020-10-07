const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    img: String,
    title: String,
    count: Number,
    mrp: Number,
    price: Number,
    youSave: String,
});

module.exports = mongoose.model("products", productSchema);
