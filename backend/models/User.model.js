const mongoose = require("mongoose");
const validator = require("validator")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate = (value) => {
            if (!validator.isEmail(value)) {
                throw new Error("Please enter correct email..!!");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate = (value) => {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Please enter strong password..!!");
            }
        }
    },
}, { timestamps: true })

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };