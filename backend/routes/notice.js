const express = require("express");
const { NoticeModel } = require("../models/Notice.model");
const noticeRouter = express.Router();

noticeRouter.post("/", async (req, res) => {
    try {
        const { title, description, date, category } = req.body;
        if (!title || !description || !date || !category) {
            return res.status(400).json({ status: "N", error: "Please enter required field..!!" });
        }
        const newNotice = new NoticeModel({
            title, description, date, category
        })
        await newNotice.save();
        res.status(201).json({ status: "Y", success: "Notice created successfully!!" })
    }
    catch (error) {
        res.status(500).json({ status: "N", error: "ERROR: " + error.message });
    }
})

noticeRouter.get("/", async (req, res) => {
    try {
        const data = await NoticeModel.find({});
        if (data.length === 0) {
            return res.status(400).json({ status: "Y", message: "No notice found..!!" })
        }
        res.status(200).json({ status: "Y", data: data })
    }
    catch (error) {
        res.status(500).json({ status: "N", error: "ERROR: " + error.message });
    }
})

noticeRouter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const findId = await NoticeModel.findById(id);
        if (!findId) {
            return res.status(400).json({ status: "N", message: "No ID found..!!" });
        }
        const findNotice = await NoticeModel.findByIdAndDelete(id);
        res.status(200).json({ status: "Y", message: "Notice Deleted Successfully..!!" })
    }
    catch (error) {
        res.status(500).json({ status: "N", error: "ERROR: " + error.message });
    }
})

noticeRouter.patch("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const findId = await NoticeModel.findById(id);
        if (!findId) {
            return res.status(400).json({ status: "N", message: "No ID found..!!" });
        }
        const allowedUpdates = ["title", "description", "date", "category"];
        const keys = Object.keys(req.body);
        const isAllowed = keys.every((field) => allowedUpdates.includes(field));
        if (!isAllowed) {
            return res.status(400).json("Entered fields are not correct..!!");
        }
        await NoticeModel.findByIdAndUpdate(id, req.body);
        res.status(200).json({ status: "Y", message: "Event Updated Successsfully..!!" })
    }
    catch (error) {
        res.status(500).json({ status: "N", error: "ERROR: " + error.message });
    }
})

module.exports = noticeRouter;