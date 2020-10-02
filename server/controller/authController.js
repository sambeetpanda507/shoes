const ProductModel = require("../model/productModel");

module.exports.getProducts = (req, res, next) => {
    ProductModel.find()
        .then((products) => {
            res.status(200).json({
                products: products,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
