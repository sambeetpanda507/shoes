const mongoose = require("mongoose");
require("dotenv").config();

const uris = process.env.MONGODB_URI;

const db = mongoose.connect(uris, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = db;
