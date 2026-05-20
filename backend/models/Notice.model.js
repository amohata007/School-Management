const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
}, {timestamps: true})

const NoticeModel = mongoose.model("Notice", noticeSchema);

module.exports = {NoticeModel};