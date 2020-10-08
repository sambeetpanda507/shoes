const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require("uuid");

const ProductModel = require("../model/productModel");
const UserModel = require("../model/userModel");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD,
    },
});

module.exports.getProducts = (req, res, next) => {
    ProductModel.find()
        .then((products) => {
            res.status(200).json({
                products: products,
            });
        })
        .catch((err) => {
            next(err);
        });
};

module.exports.postSignup = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(403).json({
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

module.exports.postForgot = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(403).json({
            message: error.array()[0].msg,
        });
    }
    const { email } = req.body;
    crypto.randomBytes(32, (err, buff) => {
        if (err) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
        const token = buff.toString("hex");
        UserModel.updateOne(
            { email: email },
            {
                $set: {
                    resetToken: token,
                    tokenExpiration: Date.now() + 1000 * 60 * 10,
                },
            }
        )
            .then((result) => {
                if (!result) {
                    const error = new Error("internal server error");
                    error.statusCode = 500;
                    throw error;
                }
                transporter
                    .sendMail({
                        from: process.env.APP_EMAIL,
                        to: email,
                        subject: "password reset request",
                        html: `<p>You have requested for the password reset.</p><p> Click <a href='http://localhost:3000/reset/${token}'>here</a> to reset password</p>`,
                    })
                    .then((mail) => {
                        if (!mail) {
                            const error = new Error("internal server error");
                            error.statusCode = 500;
                            throw error;
                        }
                        res.status(200).json({
                            message: "mail sent",
                        });
                    })
                    .catch((err) => {
                        if (!err.statusCode) {
                            err.statusCode = 500;
                        }
                        next(err);
                    });
            })
            .catch((err) => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
    });
};

module.exports.patchResetPassword = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(401).json({
            message: error.array()[0].msg,
        });
    }
    const { email, password } = req.body;
    const token = req.params.token;
    UserModel.findOne({
        email: email,
        resetToken: token,
        tokenExpiration: {
            $gt: Date.now(),
        },
    })
        .then((user) => {
            if (!user) {
                const error = new Error(
                    "invalid email address or password reset has expired"
                );
                error.statusCode = 401;
                throw error;
            }
            bcrypt
                .hash(password, 12)
                .then((hashedPaassword) => {
                    user.password = hashedPaassword;
                    user.resetToken = "";
                    user.tokenExpiration = Date.now();
                    return user.save();
                })
                .then((result) => {
                    res.status(201).json({
                        message: "password successfully reset",
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        error: err,
                    });
                });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

module.exports.postCheckout = (req, res, next) => {
    const { token, totalPrice } = req.body;
    const idempotencyKey = uuidv4();

    return stripe.customers
        .create({
            email: token.email,
            source: token.id,
        })
        .then((customer) => {
            stripe.charges.create(
                {
                    amount: totalPrice * 100,
                    currency: "inr",
                    customer: customer.id,
                    receipt_email: token.email,
                },
                { idempotencyKey }
            );
        })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

module.exports.addProducts = (req, res, next) => {
    const cartItems = req.body.cartItems;
    const user = JSON.parse(req.body.user);
    UserModel.findOne({ email: user.email })
        .then((user) => {
            user.orders = [...user.orders, { cart: cartItems }];
            return user.save();
        })
        .then((result) => {
            res.status(201).json({
                message: "successfully saved",
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

module.exports.getOrders = (req, res, next) => {
    const { email } = req.body;
    UserModel.findOne({ email: email })
        .then((user) => {
            if (!user) {
                const error = new Error("No such user found");
                error.statusCode = 401;
                throw error;
            }
            res.status(200).json({
                orders: user.orders,
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

// :TODO store products to the database

// module.exports.storeProducts = (req, res, next) => {
//     const { img, title, count, mrp, price, youSave } = req.body;
//     const productModel = new ProductModel({
//         img: img,
//         title: title,
//         count: count,
//         mrp: mrp,
//         price: price,
//         youSave: youSave,
//     });
//     productModel
//         .save()
//         .then((result) => {
//             res.status(201).json(result);
//         })
//         .catch((err) => {
//             res.status(500).json(err);
//         });
// };
