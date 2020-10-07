const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        resetToken: String,
        tokenExpiration: Date,
        cart: [
            {
                type: Schema.Types.ObjectId,
                ref: "products",
            },
        ],
    },
    { timestamps: true }
);
module.exports = mongoose.model("users", userSchema);
