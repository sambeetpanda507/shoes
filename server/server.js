const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./router/authRouter");
const { body } = require("express-validator");
const db = require("./utils/db");
require("dotenv").config();

const port = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api", authRouter);

app.get("/", (req, res, next) => {
    res.send("<h1>Hello World</h1>");
});

app.use((error, req, res, next) => {
    res.status(error.statusCode).json({
        message: error.message,
    });
});

db.then(() => {
    console.log("connected to the database");
    app.listen(port, () => {
        console.log(`server is listening on port http://localhost:${port}`);
    });
}).catch((err) => {
    console.log(err);
});
