const express = require("express");
const { ContactModel } = require("../models/Contact.model");
const contactRouter = express.Router();

contactRouter.post("/", async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;
        if (!name || !email || !phone || !subject || !message) {
            return res.status(400).json({ status: "N", error: "Please enter required field..!!" });
        }
        const newContact = new ContactModel({
            name, email, phone, subject, message
        })
        await newContact.save();
        res.status(201).json({ status: "Y", success: "Thankyou..We will contact you soon..!!" })
    }
    catch (error) {
        res.status(500).json({ status: "N", error: "ERROR: " + error.message });
    }
})

contactRouter.get("/", async (req, res) => {
    try {
        const data = await ContactModel.find({});
        if (data.length === 0) {
            return res.status(400).json({ status: "Y", message: "No data found..!!" })
        }
        res.status(200).json({ status: "Y", data: data })
    }
    catch (error) {
        res.status(500).json({ status: "N", error: "ERROR: " + error.message });
    }
})

contactRouter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const findId = await ContactModel.findById(id);
        if (!findId) {
            return res.status(400).json({ status: "N", message: "No ID found..!!" });
        }
        const findContact = await ContactModel.findByIdAndDelete(id);
        res.status(200).json({ status: "Y", message: "Contact Deleted Successfully..!!" })
    }
    catch (error) {
        res.status(500).json({ status: "N", error: "ERROR: " + error.message });
    }
})

module.exports = contactRouter;