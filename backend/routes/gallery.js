const express = require("express");
const { GalleryModel } = require("../models/Gallery.model");
const authJWT = require("../middlewares/auth.middleware");
const galleryRouter = express.Router();

galleryRouter.post("/",authJWT, async (req, res) => {
    try {
        const { title, imageUrl, date } = req.body;
        if (!title || !imageUrl || !date) {
            return res.status(400).json({ status: "N", error: "Please enter required field..!!" });
        }
        const newGallery = new GalleryModel({
            title, imageUrl, date
        })
        await newGallery.save();
        res.status(201).json({ status: "Y", success: "Gallery created successfully!!" })
    }
    catch (error) {
        res.status(500).json({ status: "N", error: "ERROR: " + error.message });
    }
})

galleryRouter.get("/", async (req, res) => {
    try {
        const data = await GalleryModel.find({});
        if (data.length === 0) {
            return res.status(400).json({ status: "Y", message: "No event found..!!" })
        }
        res.status(200).json({ status: "Y", data: data })
    }
    catch (error) {
        res.status(500).json({ status: "N", error: "ERROR: " + error.message });
    }
})

galleryRouter.delete("/:id",authJWT, async (req, res) => {
    try {
        const id = req.params.id;
        const findId = await GalleryModel.findById(id);
        if (!findId) {
            return res.status(400).json({ status: "N", message: "No ID found..!!" });
        }
        const findGallery = await GalleryModel.findByIdAndDelete(id);
        res.status(200).json({ status: "Y", message: "Gallery Deleted Successfully..!!" })
    }
    catch (error) {
        res.status(500).json({ status: "N", error: "ERROR: " + error.message });
    }
})

galleryRouter.patch("/:id",authJWT, async (req, res) => {
    try {
        const id = req.params.id;
        const findId = await GalleryModel.findById(id);
        if (!findId) {
            return res.status(400).json({ status: "N", message: "No ID found..!!" });
        }
        const allowedUpdates = ["title", "imageUrl", "date"];
        const keys = Object.keys(req.body);
        const isAllowed = keys.every((field) => allowedUpdates.includes(field));
        if (!isAllowed) {
            return res.status(400).json("Entered fields are not correct..!!");
        }
        await GalleryModel.findByIdAndUpdate(id, req.body);
        res.status(200).json({ status: "Y", message: "Gallery Updated Successsfully..!!" })
    }
    catch (error) {
        res.status(500).json({ status: "N", error: "ERROR: " + error.message });
    }
})

module.exports = galleryRouter;