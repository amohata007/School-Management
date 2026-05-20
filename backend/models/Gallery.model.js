const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    imageUrl:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true,
    },
}, {timestamps: true})

const GalleryModel = mongoose.model("Gallery", gallerySchema);

module.exports = {GalleryModel};