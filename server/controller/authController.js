const ProductModel = require("../model/productModel");
const UserModel = require("../model/userModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

module.exports.postSignup = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        console.log(error);
        return res.status(422).json({
            message: error.array()[0].msg,
        });
    }
    const { name, email, password } = req.body;
    bcrypt
        .hash(password, 12)
        .then((encPassword) => {
            const userModel = new UserModel({
                name: name,
                email: email,
                password: encPassword,
            });
            return userModel.save();
        })
        .then((result) => {
            if (!result) {
                const error = new Error("unable to signup");
                error.statusCode = 500;
                throw error;
            }
            res.status(201).json({
                message: "successfully signup",
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

module.exports.postSignin = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        console.log(error);
        return res.status(403).json({
            message: error.array()[0].msg,
        });
    }
    let verifiedUser = "";
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then((user) => {
            if (!user) {
                const error = new Error("incorrect email or password");
                error.statusCode = 401;
                throw error;
            }
            verifiedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then((result) => {
            if (!result) {
                const error = new Error("incorrect email or password");
                error.statusCode = 401;
                throw error;
            }
            console.log(verifiedUser);
            const token = jwt.sign(
                {
                    _id: verifiedUser._id,
                    name: verifiedUser.name,
                    email: verifiedUser.email,
                },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
            res.status(200).json({
                message: "successfully login",
                userId: verifiedUser._id,
                name: verifiedUser.name,
                email: verifiedUser.email,
                expiresIn: Date.now() + 1000 * 60 * 60,
                token: token,
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
