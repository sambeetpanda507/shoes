const express = require("express");
const { body } = require("express-validator");
const authController = require("../controller/authController");
const UserModel = require("../model/userModel");

const router = express.Router();

//GET: http://localhost:8080/api/products
router.get("/products", authController.getProducts);

//POST: http://localhost:8080/api/signup
router.post(
    "/signup",
    [
        body("name").notEmpty().withMessage("name can't left empty"),
        body("email")
            .isEmail()
            .normalizeEmail()
            .withMessage("please enter a valid email")
            .custom((value, { req }) => {
                return UserModel.findOne({ email: value }).then((user) => {
                    if (user) {
                        return Promise.reject(
                            "email id already exist.Please choose another one."
                        );
                    }
                });
            }),
        body("password")
            .isLength({ min: 6 })
            .withMessage("password must be atleast 6 characters long"),
    ],
    authController.postSignup
);

//POST: http://localhost:8080/api/signin
router.post(
    "/signin",
    [
        body("email")
            .isEmail()
            .normalizeEmail()
            .withMessage("please enter a valid email and password"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("please enter a valid email or password"),
    ],
    authController.postSignin
);

router.post(
    "/forgot",
    [
        body("email")
            .isEmail()
            .withMessage("please enter a valid email.")
            .normalizeEmail()
            .custom((value, { req }) => {
                return UserModel.findOne({ email: value }).then((user) => {
                    if (!user) {
                        return Promise.reject("Invalid email address");
                    }
                });
            }),
    ],
    authController.postForgot
);

module.exports = router;
