const express = require("express");
const { EventModel } = require("../models/Event.model");
const authJWT = require("../middlewares/auth.middleware");
const eventRouter = express.Router();

eventRouter.post("/",authJWT, async (req, res) => {
    try {
        const { title, description, shortDescription, date, location } = req.body;
        if (!title || !description || !shortDescription || !date || !location) {
            return res.status(400).json({ status: "N", error: "Please enter required field..!!" });
        }
        const newEvent = new EventModel({
            title, description, shortDescription, date, location
        })
        await newEvent.save();
        res.status(201).json({ status: "Y", success: "Event created successfully!!" })
    }
    catch (error) {
        res.status(500).json({ status: "N", error: "ERROR: " + error.message });
    }
})

eventRouter.get("/", async (req, res) => {
    try {
        const data = await EventModel.find({});
        if (data.length === 0) {
            return res.status(400).json({ status: "Y", message: "No event found..!!" })
        }
        res.status(200).json({ status: "Y", data: data })
    }
    catch (error) {
        res.status(500).json({ status: "N", error: "ERROR: " + error.message });
    }
})

eventRouter.delete("/:id",authJWT, async (req, res) => {
    try {
        const id = req.params.id;
        const findId = await EventModel.findById(id);
        if (!findId) {
            return res.status(400).json({ status: "N", message: "No ID found..!!" });
        }
        const findEvent = await EventModel.findByIdAndDelete(id);
        res.status(200).json({ status: "Y", message: "Event Deleted Successfully..!!" })
    }
    catch (error) {
        res.status(500).json({ status: "N", error: "ERROR: " + error.message });
    }
})

eventRouter.patch("/:id",authJWT, async (req, res) => {
    try {
        const id = req.params.id;
        const findId = await EventModel.findById(id);
        if (!findId) {
            return res.status(400).json({ status: "N", message: "No ID found..!!" });
        }
        const allowedUpdates = ["title", "description", "shortDescription", "date", "location"];
        const keys = Object.keys(req.body);
        const isAllowed = keys.every((field) => allowedUpdates.includes(field));
        if (!isAllowed) {
            return res.status(400).json("Entered fields are not correct..!!");
        }
        await EventModel.findByIdAndUpdate(id, req.body);
        res.status(200).json({ status: "Y", message: "Event Updated Successsfully..!!" })
    }
    catch (error) {
        res.status(500).json({ status: "N", error: "ERROR: " + error.message });
    }
})

module.exports = eventRouter;