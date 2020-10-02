const express = require("express");
const authController = require("../controller/authController");

const router = express.Router();

//GET: http://localhost:8080/api/products
router.get("/products", authController.getProducts);

//POST: http://localhost:8080/api/signin
// router.post("/signin", authController.postSignin);

module.exports = router;
