const mongoose = require("mongoose");
const validator = require("validator");

const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLenght: 4
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate = (value) =>{
            if(!validator.isEmail(value)){
                throw new Error("Please enter correct email..!!");
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        validate = (value) =>{
            if(!validator.isNumeric(value) && value.length === 10){
                throw new Error("Please enter correct mobile number..!!");
            }
        }
    },
    subject:{
        type: String,
        required: true,
        minLenght: 4
    },
    message:{
        type: String,
        required: true,
        minLenght: 4
    },
}, {timestamps: true})

const ContactModel = mongoose.model("Contact", contactSchema);

module.exports = {ContactModel};